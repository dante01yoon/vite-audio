import { FC, HTMLAttributes } from 'react';

interface TextFieldProps extends HTMLAttributes<HTMLInputElement> {
  name: string;
  register: Function;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  header?: string;
}

export const TextField: FC<TextFieldProps> = ({
  className,
  header,
  name,
  minLength,
  maxLength,
  register,
  required = false,
  ...props
}) => {
  return (
    <div className={`cmp_text_field_wrapper ${className}`}>
      {header && <label>{header}</label>}
      <input
        {...props}
        {...register(name, {
          required,
          min: minLength,
          max: maxLength
        })}
      />
    </div>
  );
};
