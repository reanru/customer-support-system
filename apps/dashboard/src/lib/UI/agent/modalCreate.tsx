import React from 'react'

type ModalProps = {
    handleClose: () => void,
}

export default function ModalCreate({ handleClose } : ModalProps) {
    return (
        <div>
            
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-black/75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white">

                                <div className="pb-3 border-b border-gray-300 p-5">
                                    <span className="font-semibold">Create Data</span>
                                </div>

                                <form className="w-full mx-auto space-y-4 p-5">
                                    <div className="">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                        <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="form-control" />
                                    </div>
                                    <div className="">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                                        <input type="password" id="password" className="form-control" required />
                                    </div>

                                    <div className="gap-2 flex justify-end ">
                                        <button onClick={handleClose} type="button" className="btn-secondary h-8">Cancel</button>
                                        <button type="button" className="btn-primary h-8">Deactivate</button>
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
