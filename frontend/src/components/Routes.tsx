import { FC } from 'react';
import { IndexPage, AudioPage, NotFoundPage } from '@pages/index';
import { Routes, Route } from 'react-router-dom';
import { AppContainer } from '@components/index';
import { useAppContext } from '@hooks/index';
import { useActor } from '@xstate/react';

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
  console.log('toastState: ', toastState);
  console.log('authState: ', authState);
  return (
    <AppContainer>
      <Routes>
        {routeConfigs.map(({ path, component: Component }, index) => {
          return <Route key={path} path={path} element={<Component />} />;
        })}
      </Routes>
      {}
    </AppContainer>
  );
};

export default AppRoutes;
