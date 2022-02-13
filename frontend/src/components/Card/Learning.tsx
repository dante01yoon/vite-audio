import { FC } from 'react';
import cs from 'classnames';

export interface LearningProps {
  title: string; // 카드 이름
  text: string; // 원문
  imgSrc?: string;
  toggle?: boolean;
}

const styleMap = {
  bg: (imgSrc?: string) => ({ [`bg-url(${imgSrc})`]: true, 'rounded-[50%]': true }),
  border: (toggle: boolean = false) => ({
    'border-solid': toggle,
    'border-none': !toggle,
    'border-2': toggle,
    'border-cyan-700': toggle
  })
};

export const Learning: FC<LearningProps> = ({ title, text, imgSrc, toggle }) => {
  return (
    <div className={`flex cmp-learning-card ${styleMap.border(toggle)}`}>
      <div className={cs(styleMap.bg(imgSrc))} />
      <div>
        <div className={'font-bold mb-[10px]'}>{title}</div>
        <div className="text-ellipsis overflow-hidden f-width max-w-[200px] decoration-cardText">
          {text}
        </div>
      </div>
    </div>
  );
};
