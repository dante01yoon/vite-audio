import { createContext } from 'react';
import { useInterpret } from '@xstate/react';
import { authMachine, ModalContext, ModalEvent, modalMachine } from './machines';
import { ActorRefFrom, Interpreter } from 'xstate';

export type GlobalContextType = {
  authService: ActorRefFrom<typeof authMachine>;
  // see https://github.com/statelyai/xstate/discussions/1761
  modalService: ActorRefFrom<Interpreter<ModalContext, any, ModalEvent>['machine']>;
};

export const GlobalContext = createContext({} as GlobalContextType);

/**
 * @see https://xstate.js.org/docs/recipes/react.html#global-state-react-context
 */
export const XStateProvider: React.FC = ({ children }) => {
  const authService = useInterpret(authMachine);
  const modalService = useInterpret(modalMachine);
  const service = {
    authService,
    modalService
  };

  return <GlobalContext.Provider value={service}>{children}</GlobalContext.Provider>;
};
