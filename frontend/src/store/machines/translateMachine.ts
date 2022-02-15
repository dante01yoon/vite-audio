import { http } from '@/api';
import type { TranslatePayload } from '@/hooks';
import { createMachine, assign } from 'xstate';

const machineState = {
  loading: 'loading',
  resolved: 'resolved',
  rejected: 'rejected'
};

interface Context {
  original: string;
  translated?: string;
  audio?: string;
  source?: string;
  target?: string;
}

type TRANSLATE = {
  type: 'TRANSLATE';
  data: Context;
};

// fetch 이후 normalize 해야 함
const fetchTranslate = async (_: Context, events: TRANSLATE): Promise<TRANSLATE['data']> => {
  const { original: text, target = 'ko', source = 'en' } = events.data;
  // TODO
  // @ts-ignore
  const response: TranslatePayload = await http.POST<TranslatePayload>('translate', {
    data: {
      text,
      source,
      target
    }
  });
  return {
    original: text,
    translated: response.text,
    source,
    target
  };
};

export const translateMachine = createMachine(
  {
    id: 'translate',
    initial: machineState.resolved,
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
          TRANSLATE: {
            target: machineState.loading
          }
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
      update: assign((_, event: TRANSLATE) => event.data)
    }
  }
);
