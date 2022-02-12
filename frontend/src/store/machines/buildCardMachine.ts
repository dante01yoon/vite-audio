import { createMachine } from 'xstate';

export type BUILD_CARD_MACHINE_STATE = 'initial' | 'created' | 'deleted';

const machineState: Record<BUILD_CARD_MACHINE_STATE, BUILD_CARD_MACHINE_STATE> = {
  initial: 'initial',
  created: 'created',
  deleted: 'deleted'
};

export const buildCardMachine = createMachine({
  id: 'buildCard',
  initial: machineState.initial,
  states: {
    [machineState.initial]: {
      on: {
        CREATE: machineState.created
      }
    },
    [machineState.created]: {
      on: {
        DELETE: machineState.deleted
      }
    },
    [machineState.deleted]: {
      on: {
        CREATE: machineState.created
      }
    }
  }
});
