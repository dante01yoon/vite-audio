import AppRoute from '@components/Routes';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import '../styles/global.scss';
import { XStateProvider } from './store';
import { useAppContext } from './hooks';
const queryClient = new QueryClient();

function App() {
  const {} = useAppContext();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <XStateProvider>
          <header></header>
          <main className="container mx-auto">
            <AppRoute />
          </main>
        </XStateProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
