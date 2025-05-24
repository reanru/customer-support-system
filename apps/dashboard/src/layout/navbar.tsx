"use client"

import React, { useEffect, useState } from 'react'

import { useAppSelector } from '@/lib/redux/hooks';

import { FaBars, FaTimes } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

type NavbarProps = {
    open: boolean,
    handleOpen: () => void;
};

type UserProfile = {
    id?: string,
    name?: string,
    email?: string,
    role?: string
}

export default function Navbar({open, handleOpen} : NavbarProps) {
    const get_profile = useAppSelector((state) => state.get_profile);

    const [openDropdown, setOpenDropdown] = useState(false);
    const [userProfile, setUserProfile] = useState<UserProfile>({});

    useEffect(() => {
        if(get_profile.success){
            // console.log('testing get_profile ', get_profile.data);
            setUserProfile(get_profile.data);
        }
    }, [get_profile])
    

    const handleLogout = async () => {
        const res = await fetch('http://localhost:3000/api/set-cookies', { method: 'DELETE' });
        console.log('testing logout ', res);

        if(res.status === 200) window.location.href = '/login';
    }

    return (
        <div className={"sticky top-0 flex justify-between items-center h-20 min-h-20 px-5 bg-white rounded-b-2xl shadow-xs"}>
            
            <div>
                <button
                    onClick={handleOpen}
                    className="lg:hidden btn-secondary bg-white ring-gray-400 text-gray-600"
                >
                    { open ? <FaTimes /> : <FaBars /> }
                </button>
            </div>

            <div 
                className="relative flex items-center gap-2 cursor-pointer"
                onClick={()=>{
                    setOpenDropdown(!openDropdown);
                }}
            >
                <img className="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="" />
                <div className="font-medium">
                    <div>{ userProfile.name ?? '-' }</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 lowercase">{ userProfile.role ?? '-' }</div>
                </div>
                <IoIosArrowDown className={"text-gray-500 transition-all duration-150 "+(openDropdown ? "rotate-180":"")} />

                { openDropdown && (
                    <div className="absolute flex justify-center top-16 right-0 py-2 px-4 bg-white w-36 shadow-md rounded-md">
                        <button onClick={handleLogout} className="w-full hover:bg-gray-50 py-1 text-center cursor-pointer">Logout</button>
                    </div>
                ) }

            </div>
        </div>
    )
}
