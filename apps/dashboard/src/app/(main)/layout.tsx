"use client"

import { useEffect, useState } from "react";

import Navbar from "@/layout/navbar";
import Sidebar from "@/layout/sidebar";

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { getProfile, resetGetProfile } from '@/lib/redux/features/user/slice/getProfileSlice'

import { v4 as uuidv4 } from 'uuid';
import {io, Socket} from 'socket.io-client';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const get_profile = useAppSelector((state) => state.get_profile);
  const dispatch = useAppDispatch();

  const [openSidebar, setOpenSidebar] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    dispatch(getProfile());
  }, [])

  useEffect(() => {
    if(get_profile.success){
      // console.log('testing get_profile ', get_rofile.data.id);
      
      // Menghubungkan ke server Socket.IO
      const newSocket = io('http://localhost:3001');                
      setSocket(newSocket);     
      
      newSocket.emit('join-room-agent', get_profile.data.id);

      return () => {
          console.log('disconnect');
          newSocket.disconnect();    
      }
    }
  }, [get_profile])
  
    useEffect(() => {
      if(socket){
        socket.on('init-session', (data) => {
          console.log('testing get init-session ', data);
        });
      }
    }, [socket])
  
  return (
        <div className="flex h-full gap-4">
          <Sidebar open={openSidebar} handleOpen={()=>setOpenSidebar(!openSidebar)} />
          <div className="relative flex flex-1 gap-4 flex-col">
            <Navbar open={openSidebar} handleOpen={()=>setOpenSidebar(!openSidebar)} />
              <main className="pl-5 lg:pl-1 pr-5">
                {children}
              </main>
          </div>
        </div>
  );
}
