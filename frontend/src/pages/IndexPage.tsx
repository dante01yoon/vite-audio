import { FC } from 'react';
import { Translate, BlackButton, Icon, TextField } from '@components/index';

interface IndexPageProps {}

const IndexPage: FC<IndexPageProps> = () => {
  return (
    <>
      <section className="flex gap-46">
        <article className="w-full">
          <Translate />
          <BlackButton className="mt-[37px]">번역 꼬우</BlackButton>
        </article>
        <article className="w-full">
          <Translate readOnly languageFrom="en" />
          <div className="mt-[37px]">
            <Icon iconType="speaker" className="cursor-pointer inline-block" />
          </div>
        </article>
      </section>
      <section>
        <article className="mt-[78px]">
          <div className="border-[4px] border-black max-w-[577px] px-[4px]">
            <TextField header="카드 이름: " />
          </div>
          <div className="flex h-[43px] mt-[22px]">
            <div className="border-[4px] border-black max-w-[577px] w-full mr-[52px]">
              <TextField header="원문 링크: " className="px-[4px] gap-[52px] w-full " />
            </div>
            <BlackButton className="max-w-[577px]"> 카드 생성 꼬우</BlackButton>
          </div>
        </article>
      </section>
    </>
  );
};

export default IndexPage;
