import { FC } from 'react';
import { Translate, BlackButton, Icon, TextField } from '@components/index';
import { useActor, useMachine } from '@xstate/react';
import { buildCardMachine, translateMachine } from '../store/machines';
import { useForm } from 'react-hook-form';
import { useAppContext, useTTS } from '@/hooks';
import { useNavigate } from 'react-router-dom';

interface IndexPageProps {}

const IndexPage: FC<IndexPageProps> = () => {
  const navigate = useNavigate();
  /**
   * @see https://xstate.js.org/docs/recipes/react.html#other-hooks
   */
  const [builder, sendBuilder] = useMachine(buildCardMachine, {
    actions: {
      goToAudioPage: () => {
        navigate('audio');
      }
    }
  });
  const [translator, sendTranslator] = useMachine(translateMachine);
  const { authService, modalService } = useAppContext();
  const [authState, sendAuthState] = useActor(authService);
  const [_, sendModalState] = useActor(modalService);
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
  const ttsResponse = useTTS(original);

  const protectedHandler = (next: () => void) => () => {
    if (authState.matches('signedIn')) {
      next();
    } else {
      sendModalState({
        type: 'OPEN',
        data: {
          type: 'signIn'
        }
      });
    }
  };

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

  const handleTranslate = () => {
    sendTranslator({
      type: 'TRANSLATE',
      data: {
        original
      }
    });
  };

  const handleListenTTS = async () => {
    const { data: tts } = await ttsResponse.refetch({ cancelRefetch: true });
    const audioContext = new AudioContext();
    // TODO 타입 수정
    const audioBuffer = await audioContext.decodeAudioData(tts as unknown as ArrayBuffer[][0]);
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
  };

  return (
    <>
      <section className="flex gap-46">
        <article className="w-full">
          <Translate register={register} name="original" maxLength={300} languageFrom="en" />
          <BlackButton className="mt-[37px]" onClick={protectedHandler(handleTranslate)}>
            번역 하기
          </BlackButton>
        </article>
        <article className="w-full">
          <Translate
            register={register}
            name="translated"
            value={translator.context.translated}
            readOnly
          />
          <div className="mt-[37px]">
            {!ttsResponse.isLoading ? (
              <Icon
                aria-disabled={false}
                iconType="speaker"
                className="cursor-pointer inline-block"
                onClick={protectedHandler(handleListenTTS)}
              />
            ) : (
              <div>로딩 중입니다.</div>
            )}
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
            <BlackButton className="max-w-[577px]" onClick={protectedHandler(handleCreateCard)}>
              카드 생성하기
            </BlackButton>
          </div>
        </article>
      </section>
    </>
  );
};

export default IndexPage;
