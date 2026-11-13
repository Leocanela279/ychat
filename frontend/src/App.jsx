import { useEffect, useState } from 'react';
import { io } from 'socket.io-client'
import './index.css'
const socket = io('http://localhost:3000');

function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const handleText = (e) => {
    setText(e.target.value);
  }
  const sendMessage = (e) => {
    e.preventDefault();
    if (text.trim() === "") {
      return
    }

    socket.emit('message', text)
    setMessages((prev) => [...prev,text])
    setText("")

  }



  useEffect(() => {

    const handleMessages = (msg) => {
      setMessages((prev) => [...prev, msg])
    }

    socket.on('message', handleMessages)


    return () => {


      socket.off("message", handleMessages)
    }
 },[])


  return (
    <>
      <form onSubmit={sendMessage}>
        <input value={text} onChange={handleText} type="text" name="message" placeholder='send a message' />
        <button>send</button>
      </form>

      {messages.map((msg,i) => (
        // Aquí va el elemento JSX
        <li key={i}>
          {msg}
        </li>
      ))}
    </>
  )
}

export default App;
