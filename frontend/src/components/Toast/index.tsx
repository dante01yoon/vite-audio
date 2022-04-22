import { useAppContext, useSleep } from '@/hooks';
import { useActor } from '@xstate/react';
import { FC } from 'react';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description: JSX.Element | null;
  toastId: string;
}

const Toast: FC<ToastProps> = ({ title, description, toastId }) => {
  const { toastService } = useAppContext();
  const [toast, sendToast] = useActor(toastService);

  const closeToast = () => {
    if (toast.context.toastMap.has(toastId)) {
      sendToast({
        type: 'CLOSE',
        toastId
      });
    }
  };

  useSleep(closeToast, 1000);

  return (
    <div className="p-4 text-center  bg-gray-400 w-[250px] rounded-lg to-white	">
      <div>{title}</div>
      {description}
    </div>
  );
};

export * from './ToastContainer';

export default Toast;
