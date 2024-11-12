import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket,setSocket] = useState<null | WebSocket>(null)
  const [latestMessage , setLatestMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/")
    socket.onopen = () => {
      console.log("hello connected")
      setSocket(socket)
    }
    socket.onmessage = (message)=>{
      console.log(message.data)
      setLatestMessage(message.data);
    } 

    return () => {
      socket.close()
    }
  },[])


    if(!socket){
      return (
        <div className='bg-black w-screen h-screen flex justify-center items-center'>
          <div className='text-white'>Connecting to the socket....</div>
        </div>
      )
    }
    else{
    return <div className='bg-black w-screen h-screen flex justify-center items-center text-white'>
      <button onClick={()=>socket.send("hello world from another world")}>send message</button>
      {latestMessage}
    </div>
    }
}

export default App;
