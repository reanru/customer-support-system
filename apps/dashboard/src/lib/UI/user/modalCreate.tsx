'use client'

import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';

import { addNewUser, resetAddNewUser } from '@/lib/redux/features/user/addNewUserSlice'

import { AiOutlineLoading3Quarters } from "react-icons/ai";

type ModalProps = {
    handleClose: () => void,
}

type User = {
    id?: string,
    name?: string,
    email?: string,
    role?: string,
    created_at?: string,
    updated_at?: string
}

export default function ModalCreate({ handleClose } : ModalProps) {
    const add_new_user = useAppSelector((state) => state.add_new_user)
    const dispatch = useAppDispatch();

    const [isSubmit, setIsSubmit] = useState(false);
    const [errors, setErrors] = useState<User>({});
    const [formValues, setFormValues] = useState<User>({});

    useEffect(() => {
        if(add_new_user.success && isSubmit === true) {
         
            console.log('testing add ', add_new_user);
            handleClose();
            setIsSubmit(false);

            setFormValues({
                name: '',
                email: '',
                role: ''
            });

            // dispatch(setBasicAlert("success", "Berhasil disimpan."));
        }
        else if(add_new_user.error && isSubmit === true)
        {
            setIsSubmit(false);

            // if(add_new_user.error.status && add_new_user.error.status === 'failed'){
            //     dispatch(setBasicAlert("danger", add_new_user.error.message));
            // }
            // else if(add_new_user.error.status && add_new_user.error.status === 'validation error'){
            //     setErrors(add_new_user.error.message);
            // }
            // else if(!add_new_user.error.status && add_new_user.error.message){
            //     dispatch(setBasicAlert("danger", add_new_user.error.message));
            // }
        }
    }, [add_new_user]);

    const validate = (value: User) => {
        const error: User = {};

        if(!value.name) error.name = "Tidak boleh kosong";
        if(!value.email) error.email = "Tidak boleh kosong";
        if(!value.role) error.role = "Tidak boleh kosong";
        
        setErrors(error);

        return Object.keys(error).length === 0 ? true : false;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value});
    }

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(validate(formValues)){
            setIsSubmit(true);
            dispatch(addNewUser(formValues));
        }
    }

    return (
        <div>
            
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-black/75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white">

                                <div className="pb-3 border-b border-gray-300 py-5 px-6">
                                    <span className="font-semibold">Create Data</span>
                                </div>

                                <form onSubmit={submit} className="w-full mx-auto space-y-4 py-5 px-6">
                                    <div className="">
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            className="form-control"
                                            defaultValue={formValues.name ?? ''}
                                            onChange={handleChange}
                                        />
                                        <span className="text-sm font-semibold text-red-500">{ errors.name }</span>
                                    </div>
                                    <div className="">
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                        <input 
                                            type="text"
                                            name="email"
                                            className="form-control"
                                            defaultValue={formValues.email ?? ''}
                                            onChange={handleChange}
                                        />
                                        <span className="text-sm font-semibold text-red-500">{ errors.email }</span>
                                    </div>
                                    <div className="">
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Role</label>
                                        <select 
                                            name="role"
                                            className="form-control h-10"
                                            defaultValue={formValues.role ?? ''}
                                            onChange={(e) => {
                                                setFormValues({...formValues, role : e.target.value})
                                            }}
                                        >
                                            <option>Select</option>
                                            <option value="ADMIN">ADMIN</option>
                                            <option value="AGENT">AGENT</option>
                                            <option value="USER">USER</option>
                                        </select>
                                        <span className="text-sm font-semibold text-red-500">{ errors.role }</span>
                                    </div>

                                    <div className="gap-2 flex justify-end ">
                                        <button onClick={handleClose} type="button" className="btn-secondary h-8">Cancel</button>
                                        <button type="submit" className="btn-primary h-8">
                                            { isSubmit ? (
                                                <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <span>Save</span>
                                            ) }
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
