import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Ship from './Ship.jsx'

function App() {
  const [count, setCount] = useState(0)
  // needed components:
  // player (has health and stuff)
  // attack button
  // status box at bottom
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <Ship name="m" health={100}/>
      </div>
    </>
  )
}

export default App
