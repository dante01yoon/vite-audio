import { createContext } from 'react';
import { useInterpret } from '@xstate/react';
import { authMachine, modalMachine } from './machines';
import { ActorRefFrom } from 'xstate';

export type GlobalContextType = {
  authService: ActorRefFrom<typeof authMachine>;
  modalService: ActorRefFrom<typeof modalMachine>;
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
