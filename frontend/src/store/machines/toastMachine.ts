import { createMachine, assign } from 'xstate';
import { nanoid } from 'nanoid';
import { http } from '@/api';

const toastState = {
  closed: 'closed',
  opening: 'opening',
  opened: 'opened',
  closing: 'closing',
  fetching: 'fetching'
};

const { closed, opening, opened, closing, fetching } = toastState;

export type ToastEvent =
  | {
      type: 'OPEN';
      mode: 'A' | 'B';
    }
  | {
      type: 'CLOSE';
    };

export interface ToastContext {
  id: string;
  jsx: JSX.Element | null;
  title: string;
  manualClose?: boolean;
  timeout?: number;
  hasFetch?: string;
  sleepTime?: number;
}

const sleep = (ms: number = 3000) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(true), ms);
  });

const fetchMode = {
  A: (params?: Record<string, string>) => http.GET('fetchA', { params }),
  B: (data?: Record<string, any>) => http.POST('fetchB', { data })
};

const fetcher = (context: ToastContext, event: ToastEvent) => {
  if (event.type === 'OPEN') {
    try {
      return fetchMode[event.mode]();
    } catch (error: any) {
      return Promise.reject({ error });
    }
  }
  return Promise.reject({ error: true });
};

// testing을 위해 함수형태로 만듬
const createToastMachine = () => {
  return createMachine(
    {
      tsTypes: {} as import('./toastMachine.typegen').Typegen0,
      schema: {
        context: {} as ToastContext,
        events: {} as ToastEvent
      },
      id: 'toast',
      initial: closed,
      states: {
        [opened]: {
          on: {
            CLOSE: closing
          },
          invoke: {
            src: sleep
          }
        },
        [closed]: {
          on: {}
        },
        [opening]: {
          // eventless transition -  https://xstate.js.org/docs/guides/transitions.html#eventless-always-transitions
          always: {
            target: opened,
            cond: 'hasFetch'
          },
          on: {
            OPEN: opened
          }
        },
        [closing]: {},
        [fetching]: {
          entry: 'executeFetching',
          invoke: {
            src: fetcher,
            onDone: [
              {
                target: 'opened',
                cond(_ctx, event) {
                  // guarded transition
                  // https://xstate.js.org/docs/guides/guards.html#guards-condition-functions
                  return event.type === 'OPEN';
                },
                actions: assign((_ctx, event) => {
                  return {
                    ...event.data,
                    id: nanoid()
                  };
                })
              },
              {
                target: 'closed',
                cond(_ctx, event) {
                  return event.type === 'CLOSE';
                },
                actions: assign((_ctx, event) => {
                  return event.data;
                })
              }
            ]
          }
        }
      }
    },
    {
      guards: {
        hasFetch: (context) => !!context.hasFetch
      }
    }
  );
};

export const toastMachine = createToastMachine();
