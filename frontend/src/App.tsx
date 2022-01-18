import { useState } from 'react'
import AppRoute from "@components/Routes"
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom';
import "../styles/global.scss";

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0)
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <header></header>
        <main>
          <AppRoute />
        </main>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
}

export default App
