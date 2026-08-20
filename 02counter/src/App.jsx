import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
// import './App.css'

function App() {
  const [counter, setCounter] = useState(15);

  //let counter = 15

  const addValue = () => {
    //counter = counter + 1
    setCounter((prevCounter) => prevCounter + 1);
    setCounter((prevCounter) => prevCounter + 1);
    setCounter((prevCounter) => prevCounter + 1);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const decreaseValue = () => {
    setCounter((prevCounter) => prevCounter - 1);
  };

  return (
    <>
      <h1>chai aur react</h1>
      <h2>counter value: {counter}</h2>

      <button onClick={addValue}>Add value {counter}</button>
      <br />
      <button onClick={decreaseValue}>decrease value {counter}</button>
      <p>footer: {counter}</p>
    </>
  );
}

export default App;