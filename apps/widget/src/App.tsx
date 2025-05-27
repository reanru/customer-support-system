import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { v4 as uuidv4 } from 'uuid';
import {io, Socket} from 'socket.io-client';


type Message = {
    id?: string,
    session_id?: string,
    sender_id?: string,
    sender_type?: string,
    content?: string,
    read_at?: string | null,
    created_at?: string
}

function App() {
  const messagesRef = useRef<HTMLInputElement>(null);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState<Message[]>([]);

  const [visitorId, setVisitorId] = useState("");
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    if(messagesRef.current){
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [conversations])

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

    getDetail(visitor);

    return () => {
        console.log('disconnect');
        newSocket.disconnect();    
    }
  }, []);

  useEffect(() => {
    if(socket){
      socket.on('receive-message', (data) => {
          console.log('testing receive-message ', data);

          setConversations((prev) => [...prev, data]);
      });
  }
  }, [socket])
  
  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const data = { 
        session_id: sessionId, 
        sender_id: visitorId, 
        content: message,
        sender_type: 'VISITOR',
        room: visitorId
      };

      socket?.emit('send-message', data);

      setConversations((prev) => [...prev, data]);
      // console.log('testing sendMessage ', message);
    
      setMessage('');
  };

  const getDetail = async (visitorId: string) => {
    let res = await fetch(`http://localhost:3001/api/visitor/${visitorId}`);

    const result = await res.json();

    setSessionId(result.data.data.id);
    setConversations(result.data.data.messages);
  }

  return (
    <>
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        <div className="w-full max-w-8/12 lg:max-w-4/12 space-y-1 bg-white p-4 rounded-2xl">

          <div className="flex flex-col justify-end w-full p-2 h-96 border border-gray-300 rounded-lg">

              <div className="space-y-1 overflow-auto" ref={messagesRef}>
                  { conversations.map((data:Message, key) => (
                      <div key={key}>
                          { data.sender_id === visitorId ? (
                              <div className="bg-blue-100 p-2 text-xs ml-auto max-w-8/12">{ data.content ?? '' }</div>
                          ) : (
                              <div className="bg-gray-100 p-2 text-xs mr-auto max-w-8/12">{ data.content ?? '' }</div>
                          ) }
                      </div>
                  )) }
              </div>

          </div>

          <form onSubmit={sendMessage} className="flex w-full items-center">
            <div className="flex w-full space-x-1">
              <input 
                type="text" 
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" placeholder="name@flowbite.com" required
                value={message ?? ''}
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
