import { FC, useEffect } from 'react';
import { Translate, BlackButton, Icon, TextField } from '@components/index';
import { useMachine } from '@xstate/react';
import { buildCardMachine } from '../store/machines';
import { useForm } from 'react-hook-form';

interface IndexPageProps {}

const IndexPage: FC<IndexPageProps> = () => {
  const [builder, sendBuilder] = useMachine(buildCardMachine);
  const {
    register,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      original: '',
      translated: '',
      title: undefined,
      link: ''
    }
  });
  const { original, translated, title, link } = watch();

  const handleCreateCard = () => {
    sendBuilder({
      type: 'CREATE',
      data: {
        original,
        translated,
        title,
        link
      }
    });
  };

  return (
    <>
      <section className="flex gap-46">
        <article className="w-full">
          <Translate register={register} name="original" maxLength={300} />
          <BlackButton className="mt-[37px]">번역 꼬우</BlackButton>
        </article>
        <article className="w-full">
          <Translate register={register} name="translated" readOnly languageFrom="en" />
          <div className="mt-[37px]">
            <Icon iconType="speaker" className="cursor-pointer inline-block" />
          </div>
        </article>
      </section>
      <section>
        <article className="mt-[78px]">
          <div className="border-[4px] border-black max-w-[577px] px-[4px]">
            <TextField register={register} name="title" header="카드 이름: " required />
            {errors.title && <div>이름을 정확히 입력해주세요</div>}
          </div>
          <div className="flex h-[43px] mt-[22px]">
            <div className="border-[4px] border-black max-w-[577px] w-full mr-[52px]">
              <TextField
                register={register}
                name="link"
                header="원문 링크: "
                className="px-[4px] gap-[52px] w-full "
              />
              {errors.link && <div>링크를 정확히 입력해주세요</div>}
            </div>
            <BlackButton className="max-w-[577px]" onClick={handleCreateCard}>
              카드 생성 꼬우
            </BlackButton>
          </div>
        </article>
      </section>
    </>
  );
};

export default IndexPage;
