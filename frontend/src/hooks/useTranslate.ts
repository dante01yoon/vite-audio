import { useQuery } from 'react-query';
import { http } from '@/api';

export interface TranslatePayload {
  text: string;
  source: string;
  target: string;
}

export const useTranslate = (text: string, source = 'en', target = 'kr') => {
  const { isLoading, data, error, refetch } = useQuery(
    `@translate/${text}`,
    () =>
      http.POST<TranslatePayload>('translate', {
        data: {
          text,
          source,
          target
        }
      }),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: false
    }
  );

  return {
    isLoading,
    error,
    data,
    refetch
  };
};
