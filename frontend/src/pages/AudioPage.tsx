import { FC, useState } from 'react';
import { Header, Learning } from '@components/index';

interface AudioPageProps { }

const cardData = [
  {
    id: '0',
    title: '리액트 공식 블로그 P.15',
    original: 'If you’ve been following our r...',
    link: '',
    imgSrc: '/heart.webp'
  }, {
    id: '1',
    title: '리액트 공식 블로그 P.16',
    original: 'In practice, this means you wi...',
    link: '',
    imgSrc: '/heart.webp'
  }, {
    id: '2',
    title: '리액트 공식 블로그 P.17',
    original: 'In practice, this means you wi...',
    link: '',
    imgSrc: '/heart.webp'
  }, {
    id: '3',
    title: '리액트 공식 블로그 P.18',
    original: 'In practice, this means you wi...',
    link: '',
    imgSrc: '/heart.webp'
  }, {
    id: '4',
    title: '리액트 공식 블로그 P.16',
    original: 'In practice, this means you wi...',
    link: '',
    imgSrc: '/heart.webp'
  }, {
    id: '5',
    title: '리액트 공식 블로그 P.16',
    original: 'In practice, this means you wi...',
    link: '',
    imgSrc: '/heart.webp'
  }
];

const AudioPage: FC<AudioPageProps> = () => {

  const [selected, setSelected] = useState(cardData[0].id);

  return (
    <div className='h-[100vh] flex flex-col flex-nowrap'>
      <Header>내 학습 카드</Header>
      <div className='p-[60px] flex flex-col flex-nowrap gap-[24px] overflow-scroll'>
        {cardData.map(({ id, title, original, imgSrc }) => {

          const ifSelected: boolean = id === selected;

          const clickHandler = () => {
            setSelected(id);
          }

          return <Learning key={id} title={title} text={original} clickHandler={clickHandler} imgSrc={imgSrc} toggle={ifSelected} />
        })}
      </div>
    </div>
  );
};

export default AudioPage;
