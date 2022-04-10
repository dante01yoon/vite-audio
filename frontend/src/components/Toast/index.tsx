import { FC } from 'react';

interface ToastProps {
  title?: string;
  description: JSX.Element | null;
  toastId: string;
}

const Toast: FC<ToastProps> = ({ title, description }) => {
  return (
    <div className="p-4">
      <div>{title}</div>
      <div>{description}</div>
    </div>
  );
};

export * from './ToastContainer';

export default Toast;
