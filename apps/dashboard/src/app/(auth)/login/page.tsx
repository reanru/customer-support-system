"use client"

import React, { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';

import { loginUser, resetLoginUser } from '@/lib/redux/features/auth/slice/loginUserSlice';

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { RiCustomerService2Line } from "react-icons/ri";
import { useRouter } from 'next/navigation';

type Credential = {
    email?: string,
    password?: string,
}

export default function LoginPage() {
    const login_user = useAppSelector((state) => state.login_user)
    const dispatch = useAppDispatch();
    const router = useRouter()

    const [isSubmit, setIsSubmit] = useState(false);
    const [errors, setErrors] = useState<Credential>({});
    const [formValues, setFormValues] = useState<Credential>({});

    useEffect(() => {
        if(login_user.success && isSubmit === true) {
         
            // console.log('testing add ', add_new_user);
            setIsSubmit(false);

            // redirect(`/`);
            window.location.href = '/';
        }
        else if(login_user.error && isSubmit === true)
        {
            setIsSubmit(false);
        }
    }, [login_user]);

    const validate = (value: Credential) => {
        const error: Credential = {};

        if(!value.email) error.email = "Cannot be empty";
        if(!value.password) error.password = "Cannot be empty";
        
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
            dispatch(loginUser(formValues));
        }
    }

    return (
        <>
            <a href="#" className="flex gap-1 items-center mb-6 text-2xl font-semibold text-gray-900">
                <div className="flex justify-center items-center h-7 w-8 bg-blue-600 rounded-tl-xl rounded-br-xl rounded-tr-xl">
                    <RiCustomerService2Line className="text-xl text-white" />
                </div>
                <span>CEESYS</span>    
            </a>
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <form onSubmit={submit} className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                className="form-control" placeholder="example@mail.com"
                                value={formValues.email ?? ''}
                                onChange={handleChange}
                            />
                            <span className="text-sm font-semibold text-red-500">{ errors.email }</span>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="••••••••" className="form-control"
                                value={formValues.password ?? ''}
                                onChange={handleChange}
                            />
                            <span className="text-sm font-semibold text-red-500">{ errors.password }</span>
                        </div>
                        <button type="submit" className="btn-primary w-full h-10">
                            { isSubmit ? (
                                <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
                            ) : (
                                <span>Sign in</span>
                            ) }
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
