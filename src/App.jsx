import { useState } from 'react'
import Login from './pages/Login';

function App() {
  const [count, setCount] = useState(0);

  function handleClick (e) {
    setCount((prevState) => {
      return prevState + 1
    })
  }

  return (
    <>
      <p>Cuenta: {count} </p>
      <button onClick={handleClick}> cuenta </button>
      <Login />
    </>
  )
}

export default App