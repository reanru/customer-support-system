"use client"

// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// import { Providers } from './provider';

import { Provider } from 'react-redux';
import store from '@/lib/redux/store'


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
        <Provider store={store}>
      <html lang="en">
        <body
          className="bg-slate-100"
          >
              { children }
        </body>
      </html>
            </Provider>
  );
}
