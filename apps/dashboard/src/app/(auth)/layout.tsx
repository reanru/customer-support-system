"use client"

import React from 'react'

import "../globals.css";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                { children }
            </div>
        </section>
    )
}
