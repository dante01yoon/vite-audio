import { createMachine } from 'xstate';

const machineState = {
  loading: 'loading',
  resolved: 'resolved',
  rejected: 'rejected'
};

interface Context {
  original?: string;
  translated?: string;
  audio?: string;
}

type TRANSLATE = {
  type: 'TRANSLATE';
  data: Context;
};

// fetch 이후 normalize 해야 함
const fetchTranslate = (context: Context): Promise<TRANSLATE> => {
  return Promise.resolve({ type: 'TRANSLATE', data: { original: '', translated: '', audio: '' } });
};

export const translateMachine = createMachine(
  {
    id: 'translate',
    initial: machineState.loading,
    schema: {
      context: {} as Context, // as는 xstate에서 권장함
      events: {} as TRANSLATE
    },
    states: {
      [machineState.loading]: {
        invoke: {
          id: 'fetch-translate',
          src: fetchTranslate,
          onDone: {
            target: machineState.resolved,
            actions: 'update'
          },
          onError: machineState.rejected
        }
      },
      [machineState.resolved]: {
        on: {
          TRANSLATE: machineState.loading
        }
      },
      [machineState.rejected]: {
        on: {
          TRANSLATE: machineState.loading
        }
      }
    }
  },
  {
    actions: {
      update: (_, event) => event.data
    }
  }
);
