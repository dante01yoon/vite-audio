import { useState, FC } from 'react';
import { TextBox, TextBoxProps } from '..';
import { getLanguage } from '@utils/.';
import cs from 'classnames';
import { omit } from 'rambda';
export interface TranslateProps extends Pick<TextBoxProps, 'readOnly' | 'value'> {
  name: string;
  register: (param: any) => void;
  minLength?: number;
  maxLength?: number;
  flexBasis?: string;
  width?: string;
  languageFrom?: string;
}

export const Translate: FC<TranslateProps> = ({
  languageFrom = 'kr',
  width,
  flexBasis,
  readOnly,
  register,
  ...props
}) => {
  const [language] = useState(getLanguage(languageFrom));
  const { name, minLength, maxLength, value } = props;

  return (
    <div
      className={cs({ [flexBasis || '']: flexBasis, [width || '']: width })}
      {...omit(['name', 'minLength', 'maxLength'], props)}>
      <div className="mb-[37px] font-normal text-T">{language}</div>
      <TextBox
        readOnly={readOnly}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
        register={register}
        value={value}
      />
    </div>
  );
};
