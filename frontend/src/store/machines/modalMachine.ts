import { type } from 'os';
import { createMachine, send, assign } from 'xstate';

const modalState = {
  closed: 'closed',
  opening: 'opening',
  opened: 'opened'
};

export interface ModalContext {
  type?: 'signIn' | 'signUp';
}

export interface ModalEvent {
  type: 'OPEN' | 'CLOSE';
  data?: ModalContext;
}

export const modalMachine = createMachine(
  {
    id: 'modal',
    initial: modalState.closed,
    schema: {
      context: {} as ModalContext,
      events: {} as ModalEvent
    },
    states: {
      [modalState.closed]: {
        on: {
          OPEN: {
            target: modalState.opening,
            actions: ['open_action']
          }
        }
      },
      [modalState.opened]: {
        on: {
          CLOSE: {
            target: modalState.closed
          },
          OPEN: {
            target: modalState.opened,
            actions: ['open_action']
          }
        }
      },
      [modalState.opening]: {
        on: {
          OPEN: {
            target: modalState.opened,
            actions: ['open_action']
          }
        },
        entry: send('OPEN')
      }
    }
  },
  {
    actions: {
      open_action: assign((context: ModalContext, event: ModalEvent) => {
        return { type: event.data?.type ?? context.type };
      })
    }
  }
);
