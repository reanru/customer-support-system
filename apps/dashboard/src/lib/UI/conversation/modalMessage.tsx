'use client'

import React, { useContext, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';

import { SocketContext } from "@/lib/context/socketContext";

import { addNewUser, resetAddNewUser } from '@/lib/redux/features/user/slice/addNewUserSlice'

import { FaTimes } from "react-icons/fa";

type ModalProps = {
    handleClose: () => void,
    sessionId: string,
    visitorId: string,
    agentId: string
}

type Message = {
    id?: string,
    session_id?: string,
    sender_id?: string,
    sender_type?: string,
    content?: string,
    read_at?: string | null,
    created_at?: string
}

export default function ModalMessage({ handleClose, sessionId, visitorId, agentId } : ModalProps) {
    const messagesRef = useRef<HTMLInputElement>(null);

    // const add_new_user = useAppSelector((state) => state.add_new_user)
    // const dispatch = useAppDispatch();

    const socket = useContext(SocketContext);
    const [message, setMessage] = useState("");
    const [conversations, setConversations] = useState<Message[]>([]);

    useEffect(() => {
        getDetail();
    }, [])

    useEffect(() => {
        if(messagesRef.current){
            messagesRef.current.scrollTo({
                top: messagesRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [conversations])

    useEffect(() => {
        if(socket){
            socket.on('receive-message', handleEventReceiveMessage);
        }

        return () => {
            socket?.off('receive-message', handleEventReceiveMessage);  
        };
    }, [socket]);

    const handleEventReceiveMessage = (data: Message) => {
        if(data.session_id === sessionId){
            // console.log('testing receive-message ', data);
            setConversations((prev) => [...prev, data]);
        }
    }

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = { 
            session_id: sessionId, 
            sender_id: agentId, 
            content: message,
            sender_type: 'AGENT',
            room: visitorId
        };

        socket?.emit('send-message', data);

        // console.log('testing sendMessage agent ', data);

        setConversations((prev) => [...prev, data]);

        setMessage('');
    }

  const getDetail = async () => {
    let res = await fetch(`http://localhost:3001/api/visitor/${visitorId}`);

    const result = await res.json();

    // setSessionId(result.data.data.id);
    // console.log('testing getDetail ', result.data.data.id);
    setConversations(result.data.data.messages);
  }

    return (
        <div>
            
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-black/75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                            <div className="flex justify-between pb-3 border-b border-gray-300 py-5 px-6">
                                <span className="font-semibold">Create Data</span>
                                <button onClick={handleClose} className="p-1 text-gray-400 hover:text-gray-800 hover:bg-gray-100 hover:rounded-full">
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="w-full space-y-1 bg-white p-4 rounded-2xl">

                                <div className="flex flex-col justify-end w-full p-2 h-96 border border-gray-300 rounded-lg">

                                    <div className="space-y-1 overflow-auto" ref={messagesRef}>
                                        { conversations.map((data:Message, key) => (
                                            <div key={key}>
                                                { data.sender_id === agentId ? (
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
                    </div>
                </div>
            </div>


        </div>
    )
}
