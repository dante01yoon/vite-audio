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

export const modalMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFsD2ECGAbAdAYy1VkgGIB5ABQFEA5RUAByIEsAXZ1AO3pAA9EAtACYAbEJwBmAAwBWEQE4AjIqkSAHBMVqANCACeiEQBYcIqWcVH5AdmvS11gL6PdaTLlQMwnUgGEAMmQAylQ8TLBsHNxIfIhCEjhW8vJSRhqaMhK2OvqCMiYyMlLxRlqKNlJqas6u6Ng4nt6klLRhLOxcPPwIikLiWkbWg0Z9QilGIroGCAJSOOa26g5S8kVDaqI1IG71jZzMnFDk1HQx4ZGdMd0CijI48kLWQoMSmRMy8g5ThiZmFlaLSpOLacdBwHg7XAEIiQNoRDrRUDXV6KRIiTISEQDCSfITfBAbSRyQojTSpIoyLaQhpeHwQOEXRGxHqDea3YpKJ7yLHWfFKeYfZYWBS9CRUuoeWkHKAMhFdQTKeQ4cqY7kSIRqKTWTKTXIIIY4GSa6yfVSVcaUlzbCWyqLymZZO7vCSY7G4-E3R6GoS3ETWZRaEQbITOZxAA */
  createMachine(
    {
      tsTypes: {} as import("./modalMachine.typegen").Typegen0,
      schema: { context: {} as ModalContext, events: {} as ModalEvent },
      initial: 'closed',
      id: 'modal',
      states: {
        closed: {
          on: {
            OPEN: {
              actions: 'open_action',
              target: 'opening'
            }
          }
        },
        opened: {
          on: {
            CLOSE: {
              target: 'closed'
            },
            OPEN: {
              actions: 'open_action',
              target: 'opened',
              internal: false
            }
          }
        },
        opening: {
          entry: send('OPEN'),
          on: {
            OPEN: {
              actions: 'open_action',
              target: 'opened'
            }
          }
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
