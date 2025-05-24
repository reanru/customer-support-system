'use client'

import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';

import { getListUser, resetGetListUser } from '@/lib/redux/features/user/slice/getListUserSlice'

import { FaPlusSquare, FaRegTrashAlt } from "react-icons/fa";

import ModalCreate from "@/lib/UI/user/modalCreate";
import ModalDelete from "@/lib/UI/user/modalDelete";

type User = {
    id?: string,
    name?: string,
    email?: string,
    role?: string,
    created_at?: string,
    updated_at?: string
}

export default function UserPage() {
    const get_list_user = useAppSelector((state) => state.get_list_user);
    const add_new_user = useAppSelector((state) => state.add_new_user);
    const delete_user = useAppSelector((state) => state.delete_user);

    const dispatch = useAppDispatch();

    const [listUser, setListUser] = useState([]);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User>({});

    useEffect(() => {        
        dispatch(getListUser());
    }, [])

    useEffect(() => {
        if(get_list_user.success){
            console.log('testing check 1', get_list_user);
            setListUser(get_list_user.data.data);
        }
    }, [get_list_user])

    useEffect(() => {
        if(add_new_user.success){
            dispatch(getListUser());
        }
    }, [add_new_user])

    useEffect(() => {
        if(delete_user.success){
            dispatch(getListUser());
        }
    }, [delete_user])
    
    return (
        <>
            { openModalCreate && (
                <ModalCreate handleClose={()=>setOpenModalCreate(false)} />
            ) }

            { openModalDelete && (
                <ModalDelete handleClose={()=>setOpenModalDelete(false)} id={selectedUser?.id ?? ''} />
            ) }

            <div className="card overflow-x-auto space-y-3">
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
                        { listUser.map((data : User, key) => (
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
                                    <button onClick={()=>{
                                        setOpenModalDelete(true);
                                        setSelectedUser(data);
                                    }} type="button" className="btn-secondary">
                                        <FaRegTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>
        </>
    )
}
