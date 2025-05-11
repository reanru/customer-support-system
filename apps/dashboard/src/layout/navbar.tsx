import React from 'react'

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
                    className="inline-flex lg:hidden items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                    { open ? 'Close' :'Open' }
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
