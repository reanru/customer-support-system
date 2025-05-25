import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { v4 as uuidv4 } from 'uuid';
import {io, Socket} from 'socket.io-client';

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");

  const [visitorId, setVisitorId] = useState("");

  useEffect(() => {
    // Menghubungkan ke server Socket.IO
    const newSocket = io('http://localhost:3001');                
    setSocket(newSocket);     

    let visitor = localStorage.getItem("visitor");

    if(!visitor){      
      const uuid = uuidv4();
      localStorage.setItem("visitor", uuid);
      visitor = uuid;
    }
    setVisitorId(visitor);

    newSocket.emit('join-room-visitor', visitor);

    return () => {
        console.log('disconnect');
        newSocket.disconnect();    
    }
  }, []);

  useEffect(() => {
    if(socket){
      socket.on('receiveMessage', (data) => {
          // console.log(`cek receiveMessage (${selectedFriend} - ${userId}) `);
          // if(data.sender === selectedFriend && data.receiver === userId){
          //     setMessages(prevState => {
          //         return [...prevState, data]
          //     })
          // }
          // setNewMessage(data);
      });
  }
  }, [socket])
  
  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // socket?.emit('send-message', { 
      //   sender: userId, 
      //   receiver: selectedFriend, 
      //   message: input 
      // });

      setMessage('');
  };

  return (
    <>
      <div className="bg-gray-100 flex justify-center items-center h-screen">

        <div className="w-full max-w-8/12 lg:max-w-4/12 space-y-1 bg-white p-4 rounded-2xl">

          <div className="flex flex-col justify-end w-full space-y-1 p-2 h-96 border border-gray-300 rounded-lg">

            <div className="bg-gray-100 p-2 text-xs mr-auto max-w-8/12">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
            <div className="bg-blue-100 p-2 text-xs ml-auto max-w-8/12">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>

          </div>

          <form className="flex w-full items-center">
            <div className="flex w-full space-x-1">
              <input 
                type="text" 
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" placeholder="name@flowbite.com" required
                onChange={(e) => setMessage(e.target.value)} 
              />
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
            </div>
          </form>
        </div>
        </div>



    </>
  )
}

export default App
