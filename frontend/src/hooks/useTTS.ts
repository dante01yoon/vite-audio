import { http } from '@/api';
import { useQuery } from 'react-query';

export const useTTS = (text: string) => {
  const { isLoading, error, data, refetch } = useQuery(
    text,
    () =>
      http.POST<ArrayBuffer[]>('translate', {
        responseType: 'arraybuffer',
        data: {
          text
        }
      }),
    {
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
