import { FC, useState } from 'react';
import { Header, Learning } from '@components/index';

interface AudioPageProps { }

const cardData = [
  {
    id: 0,
    title: '리액트 공식 블로그 P.15',
    text: 'If you’ve been following our r...',
    imgSrc: '/heart.webp'
  }, {
    id: 1,
    title: '리액트 공식 블로그 P.16',
    text: 'In practice, this means you wi...',
    imgSrc: '/heart.webp'
  }
];

const AudioPage: FC<AudioPageProps> = () => {
  return (
    <div>
      <Header>내 학습 카드</Header>
      <div className='p-[60px] flex flex-col flex-nowrap gap-[24px]'>
        {cardData.map(({ id, title, text, imgSrc }) => {
          const [selected, setSelected] = useState(false);

          const clickHandler = () => setSelected(true);

          return <Learning key={id} title={title} text={text} clickHandler={clickHandler} imgSrc={imgSrc} toggle={selected} />
        })}
      </div>
    </div>
  );
};

export default AudioPage;
