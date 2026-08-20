import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
// import './App.css'

import Card from "./components/card"; 
function App() {
  const [count, setCount] = useState(0);
  let myObj = {
    username: "anup",
    age: 20
  }

  let newArr = [1, 2, 3]
  return (
    <>
      <h1 className="bg-green-500 text-black p-4 rounded-xl mb-4">Tailwind Test</h1>
      <Card username="chai aur code" />
      <Card />
      <Card />
    </>
  );
}

export default App;
