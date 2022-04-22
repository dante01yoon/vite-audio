import { FC, HTMLAttributes } from 'react';

export interface ToastContaineProps extends HTMLAttributes<HTMLDivElement> {}

export const ToastContainer: FC<ToastContaineProps> = ({ children, ...props }) => {
  return (
    <div {...props} className={`toastContainer fixed z-50 inset-1/2 ${props.className}`}>
      {children}
    </div>
  );
};
