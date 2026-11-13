import { useEffect, useState } from 'react';
import { io } from 'socket.io-client'
import './index.css'
function App() {
  const socket = io('http://localhost:3000');
  const [text, setText] = useState("");

  const handleText = (e) => {
    setText(e.target.value);
  }
  const sendMessage = () => {
    socket.emit('message', text)

  }



  useEffect(() => {
  socket.on("connect", () => {
    console.log(`socket connected: ${socket.connected}`)
  })

  })


  return (
    <>
      <form onSubmit={sendMessage}>
        <input onInput={handleText} type="text" name="message" placeholder='send a message' />
        <button>send</button>
      </form>
    </>
  )
}

export default App;
