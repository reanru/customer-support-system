import React, { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { deleteUser, resetDeleteUser } from '@/lib/redux/features/user/slice/deleteUserSlice'

import { IoWarningOutline } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type ModalProps = {
    handleClose: () => void,
    id: string
}

export default function ModalDelete({ handleClose, id } : ModalProps) {
    const delete_user = useAppSelector((state) => state.delete_user)
    const dispatch = useAppDispatch();

    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        if(delete_user.success && isSubmit === true) {
            handleClose();
            setIsSubmit(false);
        }
        else if(delete_user.error && isSubmit === true)
        {
            setIsSubmit(false);
        }
    }, [delete_user]);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmit(true);
        dispatch(deleteUser(id));
    }

    return (
        <div>
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-black/75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 py-5">
                                <form onSubmit={submit} className="space-y-4">
                                    <div className="flex justify-center">
                                        <div className="text-center">
                                            <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-yellow-100">
                                                <IoWarningOutline className="w-6 h-6 text-yellow-600" />
                                            </div>
                                            <h3 className="text-base font-semibold text-gray-900 mt-2" id="modal-title">Delete User</h3>
                                            <div className="">
                                                <p className="text-sm text-gray-500">Are you sure you want to delete this user?</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="gap-2 flex justify-end ">
                                        <button onClick={handleClose} type="button" className="btn-secondary h-8">Cancel</button>
                                        <button type="submit" className="btn-primary h-8">
                                            { isSubmit ? (
                                                <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <span>Delete</span>
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
