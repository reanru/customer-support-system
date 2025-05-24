"use client"

import Navbar from "@/layout/navbar";
import Sidebar from "@/layout/sidebar";

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';

import { getProfile, resetGetProfile } from '@/lib/redux/features/user/slice/getProfileSlice'

// import { Provider } from 'react-redux';
// import store from '@/lib/redux/store';

import { useEffect, useState } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const get_rofile = useAppSelector((state) => state.get_rofile);
  const dispatch = useAppDispatch();

  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    dispatch(getProfile());
  }, [])
  
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
