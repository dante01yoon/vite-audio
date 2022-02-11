import { useState, FC } from 'react';
import { TextBox, TextBoxProps } from '..';
import { getLanguage } from '@utils/.';
import cs from 'classnames';

export interface TranslateProps extends Pick<TextBoxProps, 'readOnly'> {
  flexBasis?: string;
  width?: string;
  languageFrom?: string;
}

export const Translate: FC<TranslateProps> = ({
  languageFrom = 'kr',
  width,
  flexBasis,
  readOnly
}) => {
  const [language, setLanguage] = useState(getLanguage(languageFrom));

  return (
    <div className={cs({ [flexBasis || '']: flexBasis, [width || '']: width })}>
      <div className="mb-[37px] font-normal text-T">{language}</div>
      <TextBox readOnly={readOnly} />
    </div>
  );
};
