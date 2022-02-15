import { FC, MouseEventHandler } from 'react';
import cs from 'classnames';

export interface LearningProps {
  title: string; // 카드 이름
  text: string; // 원문
  clickHandler: MouseEventHandler;
  imgSrc?: string;
  toggle?: boolean;
}

const styleMap = {
  bg: (imgSrc?: string) => ({ [`bg-[url('${imgSrc}')]`]: true, 'rounded-[50%]': true }),
  border: (toggle: boolean = false) => toggle ? 'border-cyan-700' : 'border-transparent'
};

export const Learning: FC<LearningProps> = ({ title, text, clickHandler, imgSrc, toggle }) => {
  return (
    <div onClick={clickHandler} className={`text-[0.75rem] p-[16px] flex items-center gap-[12px] cmp-learning-card rounded-[8px] border-[1px] border-solid ${styleMap.border(toggle)}`}>
      <div className={`${cs(styleMap.bg(imgSrc))} w-[48px] aspect-square bg-cover bg-no-repeat`} />
      <div className='flex flex-col flex-nowrap gap-[8px]'>
        <div className={'font-bold'}>{title}</div>
        <div className="text-ellipsis overflow-hidden decoration-cardText">
          {text}
        </div>
      </div>
    </div>
  );
};
