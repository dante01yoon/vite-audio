import { createMachine, assign, send, actions } from 'xstate';
import { nanoid } from 'nanoid';
import { http } from '@/api';
import { F } from 'rambda';

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
      toastId: SingleToast['id'];
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

const closeToast = assign((context: ToastContext, event: ToastEvent) => {
  if (event.type === 'CLOSE') {
    context.toastMap.delete(event.toastId);
  }

  return context;
});

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
            CLOSE: {
              target: 'closed',
              actions: 'closeToast'
            }
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
        openToast,
        closeToast
      }
    }
  );
};

export const toastMachine = createToastMachine();
