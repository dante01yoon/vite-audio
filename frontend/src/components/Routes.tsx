import { FC } from 'react';
import { IndexPage, AudioPage, NotFoundPage } from '@pages/index';
import { Routes, Route } from 'react-router-dom';

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
  return (
    <Routes>
      {routeConfigs.map(({ path, component: Component }, index) => {
        return <Route key={path} path={path} element={<Component />} />;
      })}
    </Routes>
  );
};

export default AppRoutes;
