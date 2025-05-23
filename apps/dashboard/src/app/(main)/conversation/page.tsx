import React from 'react'

import { FiUser } from "react-icons/fi";
import { BiMessageSquareDetail, BiMessageSquare } from "react-icons/bi";

const list = [
    { isActive: true, newMessage: true },
    { isActive: false, newMessage: false },
]

export default function ConversationPage() {
    return (
        <>
            <div className="mb-3 card h-14 p-4 items-center">
                <h3 className="font-semibold text-blue-800">Your Recent Conversations </h3>
            </div>
            <div className="space-y-2">
                { list.map((data,key) => (
                    <div key={key} className="card flex items-center justify-between">
                        <div>
                            <span className="text-gray-700 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </span>
                        </div>
                        <div className="flex items-center gap-5">
                            <div className="relative flex items-center gap-2">
                                <div className="bg-gray-200 flex items-center justify-center h-9 w-9 rounded-full">
                                    <FiUser className="h-5 w-5 text-gray-500" />
                                </div>
                                <div className="text-gray-700">
                                    <div className="text-sm">Jese Leos</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">User</div>
                                </div>
                            </div>

                            <div className="flex items-center h-9 px-4 border border-gray-300 w-32 rounded-bl-full rounded-r-full">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                                    <span className="text-xs font-semibold">In Progress</span>
                                </div>
                            </div>

                            <div>
                                { data.newMessage && (
                                    <div className="relative">
                                        <BiMessageSquareDetail className="text-xl"/>
                                        <div className="absolute top-0 right-0 h-1 w-1 rounded-full bg-rose-500 ring-3 ring-white"></div>
                                    </div>
                                ) }
                                { !data.newMessage && (
                                    <div><BiMessageSquare className="text-xl text-gray-300" /></div>
                                ) }
                            </div>
                        </div>
                    </div>
                )) }
            </div>
        </>
    )
}
