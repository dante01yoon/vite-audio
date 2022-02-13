import { createMachine } from 'xstate';

export type BUILD_CARD_MACHINE_STATE = 'initial' | 'created' | 'deleted';

const machineState: Record<BUILD_CARD_MACHINE_STATE, BUILD_CARD_MACHINE_STATE> = {
  initial: 'initial',
  created: 'created',
  deleted: 'deleted'
};

interface Context {
  original?: string;
  translated?: string;
  title?: string;
  link?: string;
}

// xstate 문서의 네이밍 컨벤션을 따름
type CREATE_OBJECT = {
  type: 'CREATE';
  data: Context;
};

type DELETE_OBJECT = {
  type: 'DELETE';
};

export const buildCardMachine = createMachine(
  {
    id: 'buildCard',
    schema: {
      context: {} as Context,
      events: {} as CREATE_OBJECT | DELETE_OBJECT
    },
    initial: machineState.initial,
    states: {
      [machineState.initial]: {
        on: {
          CREATE: {
            target: machineState.created,
            actions: 'create'
          }
        }
      },
      [machineState.created]: {
        on: {
          DELETE: {
            target: machineState.deleted
          },
          CREATE: {
            target: machineState.created,
            actions: 'create'
          }
        }
      },
      [machineState.deleted]: {
        on: {
          CREATE: {
            target: machineState.created,
            actions: 'create'
          }
        }
      }
    }
  },
  {
    actions: {
      create: (_, event) => {
        if (event.type === 'CREATE') {
          const { original, translated, title, link } = event.data;
          return { original, translated, title, link };
        }
      }
    }
  }
);
