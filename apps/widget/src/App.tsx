import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { v4 as uuidv4 } from 'uuid';
import {io, Socket} from 'socket.io-client';

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Menghubungkan ke server Socket.IO
    const newSocket = io('http://localhost:3001');                
    setSocket(newSocket);     

    const visitor = localStorage.getItem("visitor");

    if(!visitor) localStorage.setItem("visitor", uuidv4());
    // else newSocket.emit('init-session', visitor);
    
    newSocket.emit('init-session', visitor);

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
  

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>


      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>


    </>
  )
}

export default App
