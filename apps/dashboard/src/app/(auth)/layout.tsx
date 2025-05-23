"use client"

import React from 'react'

// import { Provider } from 'react-redux';
// import store from '@/lib/redux/store';

import "../globals.css";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                { children }
            </div>
        </section>
    )
}
