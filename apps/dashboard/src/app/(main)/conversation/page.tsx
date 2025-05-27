"use client"

import React, { useContext, useEffect, useState } from 'react'

import { SocketContext } from "@/lib/context/socketContext";

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { getListConversation, resetGetListConversation } from '@/lib/redux/features/conversation/slice/getListConversationSlice'

import ModalMessage from '@/lib/UI/conversation/modalMessage';
import ConversationDetail from '@/lib/UI/conversation/conversationDetail';

type Session = {
    id: string,
    visitor_id: string | null,
    status: string,
    assigned_to: string,
    created_at: string,
    messages: Message[]
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

export default function ConversationPage() {
    const get_profile = useAppSelector((state) => state.get_profile);
    const get_list_conversation = useAppSelector((state) => state.get_list_conversation);
    const dispatch = useAppDispatch();

    // const socket = useSocket();
    const socket = useContext(SocketContext);
    const [openMessage, setOpenMessage] = useState<Session | null>(null);

    const [listConversation, setListConversation] = useState([]);

    useEffect(() => {
        if(socket){
            socket.on('init-session', handlerEventInitSession);
        }

        return () => {
            socket?.off('init-session', handlerEventInitSession);  
        };
    }, [socket]);

    const handlerEventInitSession = (data: Session) => {
        if(get_profile.data.id === data.assigned_to){
            // console.log('testing get init-session ', get_profile.data.id === data.assigned_to, data);

            socket?.emit('join-room-agent', [data.visitor_id]); // assigned_to (visitorId) -> as room
        }
    }

    useEffect(() => {        
        dispatch(getListConversation());
    }, [])

    useEffect(() => {
        if(get_list_conversation.success){
            // console.log('testing get conversation', get_list_conversation);
            setListConversation(get_list_conversation.data.data);

            socket?.emit('join-room-agent', [get_list_conversation.data.data.map((e:Session)=>{return e.visitor_id})]);
        }
    }, [get_list_conversation]);    

    return (
        <>
            { openMessage && (
                <ModalMessage 
                    handleClose={()=>setOpenMessage(null)}
                    sessionId={openMessage.id ?? ''}
                    visitorId={openMessage.visitor_id ?? ''}
                    agentId={get_profile.data.id ?? ''}

                />
            ) }
            <div className="mb-3 card h-14 p-4 items-center">
                <h3 className="font-semibold text-blue-800">Your Recent Conversations </h3>
            </div>
            <div className="space-y-2">
                { listConversation.map((data: Session,key) => (
                    <ConversationDetail 
                        key={key}
                        handleOpenModal={()=>setOpenMessage(data)}
                        sessionId={data.id ?? ''}
                        visitorId={data.visitor_id ?? ''}
                        messages={data.messages ?? []}
                        sessionOpened={openMessage?.id === data.id ? true : false}
                    />
                )) }
            </div>
        </>
    )
}
