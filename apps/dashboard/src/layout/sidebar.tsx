"use client"

import React, { useEffect, useRef, useState } from 'react'

import Link from "next/link"
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

import { BiMessageSquareDetail } from "react-icons/bi";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { LuUsers, LuLogs } from "react-icons/lu";
import { PiGear } from "react-icons/pi";

const menus = [
    { text: "Dashboard", link: '/', icon: <MdOutlineDashboardCustomize className="text-xl" /> },
    { text: "User", link: '/user', icon: <LuUsers className="text-xl" /> },
    { text: "Conversation", link: '/conversation', icon: <BiMessageSquareDetail className="text-xl" /> },
    { text: "Logs", link: '/logs', icon: <LuLogs className="text-xl" /> },
    { text: "Setting", link: '/setting', icon: <PiGear className="text-xl" /> },
]

type SidebarProps = {
    open: boolean,
    handleOpen: () => void;
}

export default function Sidebar({open, handleOpen}: SidebarProps) {
    let ref= useRef<HTMLDivElement>(null);

    const pathname = usePathname()

    // const [active, setActive] = useState("Dashboard");

    console.log('testing check ', pathname);
    
    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            if(open) handleOpen();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return (
        <>
            <div className="hidden lg:block min-w-72 w-72"></div>
            <div ref={ref} className={"fixed lg:translate-x-0 lg:block lg:fixed lg:left-0 lg:top-0 h-full w-72 bg-white rounded-r-2xl shadow-sm z-10 "
                            +(open ? "transition ease-in-out duration-500 translate-x-0" : "transition ease-in-out duration-500 -translate-x-[420px] ")
                            }>
                <div className="flex justify-center items-center h-20">
                    <span className="text-lg font-semibold text-blue-600">CEESYS</span>
                </div>

                <div className="flex flex-col items-center space-y-2">
                    { menus.map((data,key) => (
                        <Link 
                            key={key}
                            href={data.link}
                            className={"sidebar "+(pathname===data.link ? "sidebar-active" : "")}
                        >
                            { data.icon } <span className="text-sm font-light">{ data.text }</span>
                        </Link>
                    )) }
                </div>
            </div>
        </>
    )
}
