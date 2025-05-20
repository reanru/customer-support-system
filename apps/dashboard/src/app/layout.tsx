"use client"

// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// import { Providers } from './provider';

import { Provider } from 'react-redux';
import store from '@/lib/redux/store'

import Navbar from "@/layout/navbar";
import Sidebar from "@/layout/sidebar";
import { useState } from "react";

type Button = {
  handleOpen: () => void
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [openSidebar, setOpenSidebar] = useState(false);

  return (
      <html lang="en">
        <body
          className="bg-slate-100"
          >
          <Provider store={store}>
            <div className="flex h-full gap-4">
              <Sidebar open={openSidebar} handleOpen={()=>setOpenSidebar(!openSidebar)} />

              <div className="relative flex flex-1 gap-4 flex-col">
                <Navbar open={openSidebar} handleOpen={()=>setOpenSidebar(!openSidebar)} />

                  <main className="pl-5 lg:pl-1 pr-5">
                    {children}
                  </main>
              </div>
            </div>
          </Provider>

        </body>
      </html>
  );
}
