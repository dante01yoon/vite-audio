import { FC } from 'react';
import { useForm } from 'react-hook-form';
import cs from 'classnames';
export interface TextBoxProps {
  name: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  readOnly?: boolean;
  value?: string;
  flexBasis?: string;
  register: Function;
}

export const TextBox: FC<TextBoxProps> = ({
  readOnly = false,
  value,
  flexBasis,
  name,
  register,
  minLength,
  maxLength,
  required,
  ...props
}) => {
  return (
    <input
      type="text"
      value={value}
      disabled={readOnly}
      className={`${cs({
        [flexBasis || '']: flexBasis
      })} border border-solid border-black opacity-50 w-full px-[12px] py-[13px] h-[338px] overflow-y-auto`}
      {...props}
      {...register(name, {
        name,
        required,
        min: minLength,
        max: maxLength
      })}
    />
  );
};
