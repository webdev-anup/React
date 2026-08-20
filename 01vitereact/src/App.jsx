import { useState } from 'react'
import Chai from './chai'    

function App() {
  const username = "chai aur code"
  
  return (
    <div>
      <Chai/>                
      <h1>chai aur react {username}</h1>
      <p>test para</p>
    </div>
  )
}

export default App