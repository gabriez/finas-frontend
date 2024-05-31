import { useState } from 'react'

let ventas = [
  {
    precio: 5,
    nombre: 'silla 1'
  },
  {
    precio: 5,
    nombre: 'silla 2'
  },
  {
    precio: 5,
    nombre: 'silla 3'
  }
]

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
      {
        
      }
    </>
  )
}

export default App