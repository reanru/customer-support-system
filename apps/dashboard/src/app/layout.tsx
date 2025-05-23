// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Providers from "../components/providers";

import { cookies } from 'next/headers';
import TokenHandler from "./components/tokenHandler";

export default async function RootLayout({
  children,
}: { children: React.ReactNode }) {

  const cookieStore = await cookies();
  console.log('testing root layout ', cookieStore.get('token')?.value);
  

  return (
    <>
        {/* <TokenHandler token={cookieStore.get('token')?.value ?? ''} /> */}
        <html lang="en">
          <body
            className="bg-slate-100"
            >
              <Providers token={cookieStore.get('token')?.value ?? ''}>
                { children }
              </Providers>
          </body>
        </html>
    </>
  );
}

