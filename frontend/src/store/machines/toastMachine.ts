import { createMachine, assign, send, actions } from 'xstate';
import { nanoid } from 'nanoid';
import { http } from '@/api';

const toastState = {
  closed: 'closed',
  opened: 'opened',
  fetching: 'fetching'
};

const { closed, opened } = toastState;

export type ToastEvent =
  | {
      type: 'OPEN';
      toastMeta: Omit<SingleToast, 'id'>;
    }
  | {
      type: 'CLOSE';
    };

interface SingleToast {
  id: string;
  jsx: JSX.Element | null;
  manualClose?: boolean;
  title?: string;
  hasFetch?: string;
}

export interface ToastContext {
  timeout?: number;
  sleepTime?: number;
  getToasts: () => SingleToast[];
  toastMap: Map<string, SingleToast>;
}

const openToast = assign((context: ToastContext, event: ToastEvent) => {
  if (event.type === 'OPEN') {
    const uniqueId = nanoid();
    context.toastMap.set(uniqueId, {
      ...event.toastMeta,
      id: uniqueId
    });
    return {
      ...context,
      toastMap: context.toastMap
    };
  }
  return context;
});

const closeToast = assign((context, event) => {});

// testing을 위해 함수형태로 만듬
const createToastMachine = () => {
  const initialContext = {
    toastMap: new Map(),
    getToasts() {
      return Array.from(initialContext.toastMap.values());
    }
  };
  return createMachine(
    {
      tsTypes: {} as import('./toastMachine.typegen').Typegen0,
      schema: {
        context: {} as ToastContext,
        events: {} as ToastEvent
      },
      context: initialContext,
      id: 'toast',
      initial: closed,
      states: {
        [opened]: {
          on: {
            CLOSE: closed
          }
        },
        [closed]: {
          on: {
            OPEN: {
              target: 'opened',
              actions: 'openToast'
            }
          }
        }
      }
    },
    {
      actions: {
        openToast
      }
    }
  );
};

export const toastMachine = createToastMachine();
