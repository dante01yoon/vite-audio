import { FC, HTMLAttributes } from 'react';

interface TextFieldProps extends HTMLAttributes<HTMLInputElement> {
  header?: string;
}

export const TextField: FC<TextFieldProps> = ({ className, header, ...props }) => {
  return (
    <div className={`cmp_text_field_wrapper ${className}`}>
      {header && <label>{header}</label>}
      <input {...props} />
    </div>
  );
};
