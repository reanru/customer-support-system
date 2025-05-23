"use client"

import React, { useEffect } from 'react'
import { updateToken } from '@/lib/redux/features/auth/slice/tokenHandlerSlice';
import { useAppDispatch } from '@/lib/redux/hooks';

export default function TokenHandler({token}:{token: string}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('testing token handler ', token);
    
  }, [])
  
  
  return null;
}
