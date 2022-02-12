import { createContext } from 'react';
import { useInterpret } from '@xstate/react';
import { authMachine } from './machines';

export type GlobalContextType = {
  authService: {};
};

export const GlobalContext = createContext({} as GlobalContextType);

/**
 * @see https://xstate.js.org/docs/recipes/react.html#global-state-react-context
 */
export const XStateProvider: React.FC = ({ children }) => {
  const authService = useInterpret(authMachine);
  const service = {
    authService
  };

  return <GlobalContext.Provider value={service}>{children}</GlobalContext.Provider>;
};
