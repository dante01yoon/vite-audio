import { http } from '@/api';
import { AuthError, User } from '@/payload';
import { assign, createMachine, send, actions } from 'xstate';
import { toastMachine } from './toastMachine';

const { choose, log } = actions;
const machineState = {
  signedOut: 'signedOut',
  signedIn: 'signedIn',
  loading: 'loading',
  resolved: 'resolved',
  rejected: 'rejected'
};

export interface AuthContext {
  session: any;
  refresh: boolean;
}

export type AuthEvent =
  | SignUpEvent
  | SignOutEvent
  | SignInEvent
  | SignedInEvent
  | SignedOutEvent
  | SignMeEvent;

type SignUpEvent = {
  type: 'SIGNUP';
  data: {
    id: string;
    password: string;
    passwordConfirm: string;
  };
};

type SignOutEvent = {
  type: 'SIGNOUT';
};

type SignInEvent = {
  type: 'SIGNIN';
  data: {
    id: string;
    password: string;
  };
};

type SignedInEvent = {
  type: 'SIGNEDIN';
  data: {
    session: User;
  };
};

type SignedOutEvent = {
  type: 'SIGNEDOUT';
};

type SignMeEvent = {
  type: 'SIGNME';
};

const fetchSignIn = async (data: SignInEvent['data']) => {
  try {
    const response = await http.POST<{ user: User }>('/user/signIn', {
      data
    });

    return {
      by: 'SIGNIN',
      ...response.user
    };
  } catch (e) {
    return Promise.reject({
      refresh: false,
      by: 'SIGNIN'
    });
  }
};

const fetchSignUp = async (data: SignUpEvent['data']) => {
  try {
    const response = await http.POST<{ user: User }>('/user/signUp', {
      data
    });

    return {
      by: 'SIGNUP',
      ...response.user
    };
  } catch (e) {
    if (e instanceof AuthError) {
      return Promise.reject({
        by: 'SIGNUP'
      });
    }
  }
};

const fetchSignOut = async () => {
  try {
    const response = await http.POST<any>('/user/signOut');
    return {
      by: 'SIGNOUT',
      ...response.user
    };
  } catch (e) {
    return {
      by: 'SIGNOUT'
    };
  }
};

const fetchSignMe = async () => {
  try {
    const response = await http.POST<{ user: User }>('/user/me');
    return {
      by: 'SIGNME',
      ...response.user,
      refresh: true
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return Promise.reject({
        by: 'SIGNME',
        refresh: true
      });
    }
  }
};

export const authMachine = createMachine(
  {
    tsTypes: {} as import('./authMachine.typegen').Typegen0,
    initial: machineState.signedOut,
    schema: {
      context: {} as AuthContext,
      events: {} as AuthEvent
    },
    states: {
      [machineState.signedIn]: {
        on: {
          SIGNOUT: {
            target: machineState.loading
          }
        }
      },
      [machineState.signedOut]: {
        on: {
          SIGNIN: machineState.loading,
          SIGNME: machineState.loading,
          SIGNUP: machineState.loading
        }
      },
      [machineState.loading]: {
        invoke: {
          src: (
            context,
            event:
              | SignInEvent
              | SignUpEvent
              | SignOutEvent
              | SignedInEvent
              | SignedOutEvent
              | SignMeEvent
          ) => {
            switch (event.type) {
              case 'SIGNIN':
                return fetchSignIn(event.data);
              case 'SIGNOUT':
                return fetchSignOut();
              case 'SIGNME':
                return fetchSignMe();
              default:
                // SIGNUP
                return fetchSignUp((event as SignUpEvent).data);
            }
          },
          id: 'fetch-auth',
          onDone: {
            target: machineState.resolved
          },
          onError: {
            target: machineState.rejected
          }
        }
      },
      [machineState.resolved]: {
        on: {
          SIGNEDIN: {
            target: machineState.signedIn,
            actions: 'done-fetching'
          },
          SIGNEDME: {
            target: machineState.signedIn,
            actions: 'done-fetching'
          },
          SIGNEDUP: {
            target: machineState.signedIn,
            actions: 'done-fetching'
          },
          SIGNEDOUT: machineState.signedOut
        },
        entry: send((context, event) => {
          const { by } = event.data;
          let type;
          switch (by) {
            case 'SIGNIN':
            case 'SIGNUP':
              type = 'SIGNEDIN';
              break;
            case 'SIGNOUT':
              type = 'SIGNEDOUT';
              break;
            default:
              type = 'SIGNEDME';
              break;
          }

          return { type, data: event.data };
        })
      },
      [machineState.rejected]: {
        invoke: {
          id: 'toast',
          src: toastMachine
        },
        on: {
          SIGNIN: machineState.loading,
          SIGNOUT: machineState.loading,
          SIGNUP: machineState.loading,
          SIGNEDOUT: machineState.signedOut
        },
        entry: [
          send((context, event) => {
            return { type: 'SIGNEDOUT' };
          }),
          'reject-handler'
        ]
      }
    }
  },
  {
    actions: {
      'reject-handler': choose([
        {
          cond: (_, { data }) => {
            return data.by === 'SIGNUP';
          },
          actions: [
            send(
              { type: 'OPEN', toastMeta: { jsx: <div>?????? ???????????? ??????????????????.</div> } },
              { to: 'toast' }
            )
          ]
        }
      ]),
      'done-fetching': assign((context: AuthContext, event) => {
        switch (event.type) {
          case 'SIGNEDIN':
          case 'SIGNME':
            return { session: (event as SignInEvent).data };
          case 'SIGNEDOUT':
            return { session: null };
          default:
            // SIGNUP
            return { session: (event as SignUpEvent).data };
        }
      }),
      'error-fetching': (context: AuthContext, event) => {
        switch (event.type) {
          case 'SIGNIN':
          case 'SIGNUP':
            send({ type: machineState.signedOut });
          default:
            // SIGNOUT;
            send({ type: machineState.signedIn, session: context.session });
        }
      }
    }
  }
);
