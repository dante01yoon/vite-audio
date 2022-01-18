import { useState } from 'react'
import AppRoute from "@components/Routes"
import { BrowserRouter, Routes } from 'react-router-dom';
import "../styles/global.scss";

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <header></header>
      <main>
        <AppRoute />
      </main>
    </BrowserRouter>
  )
}

export default App
