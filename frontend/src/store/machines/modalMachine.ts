import { createMachine, send } from 'xstate';

const modalState = {
  closed: 'closed',
  opening: 'opening',
  opened: 'opened'
};

export const modalMachine = createMachine({
  id: 'modal',
  initial: 'closed',
  states: {
    [modalState.closed]: {
      on: {
        OPEN: {
          target: modalState.opening
        }
      }
    },
    [modalState.opened]: {
      on: {
        CLOSE: {
          target: modalState.closed
        }
      }
    },
    [modalState.opening]: {
      on: {
        OPEN: {
          target: modalState.opened
        }
      },
      entry: send('OPEN')
    }
  }
});
