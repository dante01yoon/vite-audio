import React, { FC } from 'react';
import TextConcat, { TextConcatProps } from '@components/TextBox/TextConcat';

export interface AudioCardProps {
  title: string;
  content: TextConcatProps['content'];
  id: string;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const AudioCard: FC<AudioCardProps> = ({ title, id, onClick, content }) => {
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    onClick(e);
  };

  return (
    <div onClick={handleClick}>
      <div>
        <img src={'nothing.png'} />
      </div>
      <div>{title}</div>
      <TextConcat content={content} />
    </div>
  );
};

export default AudioCard;
