import React from 'react'

import { FaBars, FaTimes } from "react-icons/fa";

type NavbarProps = {
    open: boolean,
    handleOpen: () => void;
};

export default function Navbar({open, handleOpen} : NavbarProps) {
    return (
        <div className={"sticky top-0 flex justify-between items-center h-20 min-h-20 px-6 bg-white rounded-b-2xl shadow-xs"}>
            
            <div>
                <button
                    onClick={handleOpen}
                    className="lg:hidden btn-secondary bg-white ring-gray-400 text-gray-600"
                >
                    { open ? <FaTimes /> : <FaBars /> }
                </button>
            </div>

            <div className="flex items-center gap-2">
                <img className="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="" />
                <div className="font-medium">
                    <div>Jese Leos</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Online</div>
                </div>
            </div>
        </div>
    )
}
