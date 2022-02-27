import { FC } from 'react';
import { useAppContext } from '@hooks/.';
import { useActor } from '@xstate/react';
import { AuthModal, SignUpModal } from '..';

export const AppContainer: FC = ({ children }) => {
  const { modalService } = useAppContext();
  const [modalState] = useActor(modalService);
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
    <main className="relative">
      <div className="relative z-10">{children}</div>
      {modalState.matches('opened') && (
        <div id="modalRoot" className="fixed z-20 h-full w-full top-0 left-0">
          <div className="z-15 bg-slate-900 opacity-50 h-full w-full" />
          {modal}
        </div>
      )}
    </main>
  );
};
