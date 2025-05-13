"use client"

import React, { useEffect, useRef, useState } from 'react'

import { MdOutlineDashboardCustomize } from "react-icons/md";
import { LuUsers, LuLogs } from "react-icons/lu";
import { PiGear } from "react-icons/pi";

const menus = [
    { text: "Dashboard", icon: <MdOutlineDashboardCustomize className="text-xl" /> },
    { text: "Agent", icon: <LuUsers className="text-xl" /> },
    { text: "Logs", icon: <LuLogs className="text-xl" /> },
    { text: "Setting", icon: <PiGear className="text-xl" /> },
]

type SidebarProps = {
    open: boolean,
    handleOpen: () => void;
}

export default function Sidebar({open, handleOpen}: SidebarProps) {
    let ref= useRef<HTMLDivElement>(null);

    const [active, setActive] = useState("Dashboard");

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
            <div ref={ref} className={"fixed lg:translate-x-0 lg:block lg:fixed lg:left-0 lg:top-0 h-full w-72 bg-white rounded-r-2xl shadow-xs z-10 "
                            +(open ? "transition ease-in-out duration-500 translate-x-0" : "transition ease-in-out duration-500 -translate-x-[420px] ")
                            }>
                <div className="flex justify-center items-center h-20">
                    <span className="text-lg font-semibold text-blue-600">CEESYS</span>
                </div>

                <div className="flex flex-col items-center space-y-2">
                    { menus.map((data,key) => (
                        <div 
                            key={key} 
                            className={"flex items-center w-10/12 py-3 px-4 gap-3 rounded-2xl "+(active===data.text ? "bg-blue-600 text-white hover:bg-blue-400" : "text-slate-400 hover:text-white hover:bg-blue-400")}
                            onClick={()=>setActive(data.text)}
                        >
                            { data.icon } <span className="text-sm font-light">{ data.text }</span>
                        </div>
                    )) }
                </div>
            </div>
        </>
    )
}
