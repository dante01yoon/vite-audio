import { useEffect } from 'react';

/**
 *
 * @param f 콜백 함수
 * @param ms delay [단위는 ms]
 */
export const useSleep = (f: () => void | Promise<void> = () => {}, ms: number = 0) => {
  let time: NodeJS.Timeout;
  useEffect(() => {
    time = setTimeout(() => {
      f();
    }, ms);

    return () => {
      clearTimeout(time);
    };
  }, []);
};
