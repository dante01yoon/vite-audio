import { http } from '@/api';
import { useQuery } from 'react-query';

export const useTTS = (text: string) => {
  const { isLoading, error, data, refetch } = useQuery(
    `tts/${text}`,
    () =>
      http.POST<ArrayBuffer[]>('tts', {
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
