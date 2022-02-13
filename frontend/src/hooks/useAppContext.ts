import { useContext } from 'react';
import { GlobalContext } from '@store/.';

export const useAppContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('context should be usd in XStateProvider');
  }

  return context;
};
