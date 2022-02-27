import { http } from '@/api';
import { User } from '@/payload';
import { assign, createMachine, send } from 'xstate';

const machineState = {
  signedOut: 'signedOut',
  signedIn: 'signedIn',
  loading: 'loading',
  resolved: 'resolved',
  rejected: 'rejected'
};

interface AuthContext {
  session: any;
}

interface SignUpEvent {
  type: 'SIGNUP';
  data: {
    id: string;
    password: string;
    passwordConfirm: string;
  };
}

interface SignOutEvent {
  type: 'SIGNOUT';
}

interface SignInEvent {
  type: 'SIGNIN';
  data: {
    id: string;
    password: string;
  };
}

interface SignedInEvent {
  type: 'SIGNEDIN';
  data: {
    session: User;
  };
}

interface SignedOutEvent {
  type: 'SIGNEDOUT';
}

interface SignMeEvent {
  type: 'SIGNME';
}

const fetchSignIn = async (data: SignInEvent['data']) => {
  const response = await http.POST<{ user: User }>('/user/signIn', {
    data
  });

  return {
    by: 'SIGNIN',
    ...response.user
  };
};

const fetchSignUp = async (data: SignUpEvent['data']) => {
  const response = await http.POST<{ user: User }>('/user/signUp', {
    data
  });

  return {
    by: 'SIGNUP',
    ...response.user
  };
};

const fetchSignOut = async () => {
  const response = await http.POST<any>('/user/signOut');
  return {
    by: 'SIGNOUT',
    ...response.user
  };
};

const fetchSignMe = async () => {
  const response = await http.POST<{ user: User }>('/user/me');
  return {
    by: 'SIGNME',
    ...response.user
  };
};

export const authMachine = createMachine(
  {
    initial: machineState.signedOut,
    schema: {
      context: {} as AuthContext
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
        on: {
          SIGNIN: machineState.loading,
          SIGNOUT: machineState.loading,
          SIGNUP: machineState.loading
        }
      }
    }
  },
  {
    actions: {
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
