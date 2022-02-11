import { FC } from 'react';
import cs from 'classnames';
export interface TextBoxProps {
  readOnly?: boolean;
  value?: string;
  flexBasis?: string;
}

export const TextBox: FC<TextBoxProps> = ({ readOnly = false, value, flexBasis }) => {
  return (
    <input
      type="text"
      value={value}
      disabled={readOnly}
      className={`${cs({
        [flexBasis || '']: flexBasis
      })} border border-solid border-black opacity-50 w-full px-[12px] py-[13px]`}
    />
  );
};
