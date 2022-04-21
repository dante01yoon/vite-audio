import { FC } from 'react';
import { IndexPage, AudioPage, NotFoundPage } from '@pages/index';
import { Routes, Route } from 'react-router-dom';
import { AppContainer } from '@components/index';
import { useAppContext } from '@hooks/index';
import { useActor } from '@xstate/react';
import Toast, { ToastContainer } from '@components/Toast';

interface AppRoutes {
  path: string;
  component: JSX.Element;
}

const routeConfigs = [
  { path: '/', component: IndexPage },
  { path: '/audio', component: AudioPage },
  { path: '*', component: NotFoundPage }
];

const AppRoutes: FC = () => {
  const { toastService, authService } = useAppContext();
  const [toastState, toastSend] = useActor(toastService);
  const [authState, authSend] = useActor(authService);
  const { context } = toastState;
  const toasts = context.getToasts();
  console.log(toasts);

  return (
    <AppContainer>
      <Routes>
        {routeConfigs.map(({ path, component: Component }, index) => {
          return <Route key={path} path={path} element={<Component />} />;
        })}
      </Routes>
      <ToastContainer>
        {toasts.map(({ id, title, jsx }) => {
          console.log({ id, title, jsx });
          return <Toast toastId={id} title={title} description={jsx} />;
        })}
      </ToastContainer>
    </AppContainer>
  );
};

export default AppRoutes;
