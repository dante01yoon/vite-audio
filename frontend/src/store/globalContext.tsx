import { createContext } from 'react';
import { useInterpret } from '@xstate/react';
import {
  AuthContext,
  AuthEvent,
  authMachine,
  ModalContext,
  ModalEvent,
  modalMachine,
  ToastContext,
  ToastEvent,
  toastMachine
} from './machines';
import { ActorRefFrom, Interpreter } from 'xstate';

export type GlobalContextType = {
  authService: ActorRefFrom<Interpreter<AuthContext, any, AuthEvent>['machine']>;
  // see https://github.com/statelyai/xstate/discussions/1761
  modalService: ActorRefFrom<Interpreter<ModalContext, any, ModalEvent>['machine']>;
  toastService: ActorRefFrom<Interpreter<ToastContext, any, ToastEvent>['machine']>;
};

export const GlobalContext = createContext({} as GlobalContextType);

/**
 * @see https://xstate.js.org/docs/recipes/react.html#global-state-react-context
 */
export const XStateProvider: React.FC = ({ children }) => {
  const authService = useInterpret(authMachine);
  const modalService = useInterpret(modalMachine);
  const toastService = useInterpret(toastMachine);
  const service = {
    authService,
    modalService,
    toastService
  };

  return <GlobalContext.Provider value={service}>{children}</GlobalContext.Provider>;
};
