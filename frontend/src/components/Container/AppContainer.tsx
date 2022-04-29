import { FC, useEffect, useLayoutEffect } from 'react';
import { useAppContext } from '@hooks/.';
import { useActor } from '@xstate/react';
import { AuthModal, SignUpModal } from '..';
import Toast, { ToastContainer } from '@components/Toast';

export const AppContainer: FC = ({ children }) => {
  const { modalService, authService, toastService } = useAppContext();
  const [modalState] = useActor(modalService);
  const [authState, sendAuthState] = useActor(authService);
  const [toastState, toastSend] = useActor(toastService);
  const {
    context: { getToasts }
  } = toastState;

  // FIXME 여기에 useLayoutEffect를 사용해도 괜찮은가?
  useLayoutEffect(() => {
    sendAuthState('SIGNME');
  }, []);

  const modal = (function (type) {
    switch (type) {
      case 'signIn':
        return <AuthModal />;
      case 'signUp':
        return <SignUpModal />;
      default:
        return <SignUpModal />;
    }
  })(modalState.context.type);

  return (
    <>
      <ToastContainer>
        {getToasts().map(({ id, title, jsx }) => {
          return <Toast toastId={id} title={title} description={jsx} />;
        })}
      </ToastContainer>
      <div className="relative z-10">{children}</div>
      {modalState.matches('opened') && (
        <div id="modalRoot" className="fixed z-20 h-full w-full top-0 left-0">
          <div className="z-15 bg-slate-900 opacity-50 h-full w-full" />
          {modal}
        </div>
      )}
    </>
  );
};
