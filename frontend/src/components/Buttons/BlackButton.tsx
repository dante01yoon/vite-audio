import { FC, HTMLAttributes } from 'react';
import cs from 'classnames';

interface BlackButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export const BlackButton: FC<BlackButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button className={`${cs({ cmp_button_black: 1 })} py-[12px] ${className}`} {...props}>
      {children}
    </button>
  );
};
