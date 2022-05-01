import { FC, HTMLAttributes } from 'react';

export interface TextConcatProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
  lineClamp?: number;
}

const TextConcat: FC<TextConcatProps> = ({ content, lineClamp = 3 }) => {
  return <div className="text-ellipsis overflow-hidden padding-10 line-clamp-3">{content}</div>;
};

export default TextConcat;
