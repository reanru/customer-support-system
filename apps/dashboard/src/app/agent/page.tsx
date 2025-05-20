'use client'

import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';

import { getListAgent } from '@/lib/redux/features/agent/agentSlice'

import { FaPlusSquare } from "react-icons/fa";

import ModalCreate from "@/lib/UI/agent/modalCreate";

type Agent = {
    id: string,
    name: string,
    email: string,
    role: string,
    created_at: string,
    updated_at: string
}

export default function AgentPage() {
    const get_list_agent = useAppSelector((state) => state.get_list_agent)
    const dispatch = useAppDispatch();

    const [listAgent, setListAgent] = useState([]);
    const [openModalCreate, setOpenModalCreate] = useState(false);

    useEffect(() => {        
        dispatch(getListAgent());
    }, [])

    useEffect(() => {
        if(get_list_agent.success){
            // console.log('testing check ', get_list_agent.data.data);
            setListAgent(get_list_agent.data.data);
        }
    }, [get_list_agent])
    
    return (
        <>
            { openModalCreate && (
                <ModalCreate handleClose={()=>setOpenModalCreate(false)} />
            ) }
            <div className="card relative overflow-x-auto space-y-2">
                <button onClick={()=>setOpenModalCreate(true)} type="button" className="btn-primary">
                    <span>Create</span>
                    <FaPlusSquare />
                </button>
                <table className="border border-gray-100 w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { listAgent.map((data : Agent, key) => (
                            <tr key={key} className="bg-white border-b border-gray-200">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    { data.name ?? '-' }
                                </th>
                                <td className="px-6 py-4">
                                    { data.email ?? '-' }
                                </td>
                                <td className="px-6 py-4">
                                    { data.role ?? '-' }
                                </td>
                                <td className="px-6 py-4">
                                    -
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>
        </>
    )
}
