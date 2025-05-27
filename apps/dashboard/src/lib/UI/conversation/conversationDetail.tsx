import React, { useContext, useEffect, useState } from 'react'

import { SocketContext } from "@/lib/context/socketContext";

import { FiUser } from "react-icons/fi";
import { BiMessageSquareDetail, BiMessageSquare } from "react-icons/bi";

type DetailProps = {
    handleOpenModal: () => void,
    sessionId: string,
    visitorId: string,
    messages: Message[],
    sessionOpened: boolean
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

export default function ConversationDetail({handleOpenModal, visitorId, sessionId, messages, sessionOpened}: DetailProps) {
    const socket = useContext(SocketContext);


    const [latest, setLatest] = useState("");
    const [unread, setUnread] = useState(false);

    useEffect(() => {
        if(messages.length > 0){
            setUnread(false);
            setLatest(messages[0].content ?? '');
        }
    }, [])
    
    useEffect(() => {
        if(socket){
            socket.on('receive-message', handlerEventReceiveMessage);
        }

        return () => {
            socket?.off('receive-message', handlerEventReceiveMessage);  
        };
    }, [socket, sessionOpened]);

    const handlerEventReceiveMessage = (data: Message) => {
        // jika session_id dari pesan masuk sama dengan current sessionId
        if(data.session_id === sessionId){
            console.log('testing receive-message ', sessionOpened, data.session_id, ' - ', sessionId);

            setLatest(data.content ?? '');

            // jika current session tidak sedang dibuka dan masuk pesan
            if(!sessionOpened){
                setUnread(true);
            }
        }
    }

    return (
            <div 
                className="card flex items-center justify-between"
                onClick={()=>{
                    handleOpenModal();
                    setUnread(false);
                }}
            >
                <div>
                    <span className={"text-gray-700 text-sm "+(unread ? "font-bold":"")}>{latest}</span>
                </div>
                <div className="flex items-center gap-5">
                    {/* <div className="relative flex items-center gap-2">
                        <div className="bg-gray-200 flex items-center justify-center h-9 w-9 rounded-full">
                            <FiUser className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="text-gray-700">
                            <div className="text-sm whitespace-nowrap">Jese Leos</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">User</div>
                        </div>
                    </div> */}

                    <div className="flex items-center h-9 px-4 border border-gray-300 w-32 rounded-bl-full rounded-r-full">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                            <span className="text-xs font-semibold">In Progress</span>
                        </div>
                    </div>

                    <div>
                        { unread ? (
                            <div className="relative">
                                <BiMessageSquareDetail className="text-xl"/>
                                <div className="absolute top-0 right-0 h-1 w-1 rounded-full bg-rose-500 ring-3 ring-white"></div>
                            </div>
                        ) : (
                            <div><BiMessageSquare className="text-xl text-gray-300" /></div>
                        ) }
                    </div>
                </div>
            </div>
    )
}
