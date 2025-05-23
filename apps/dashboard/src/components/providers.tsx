// components/Providers.tsx
'use client';

import { Provider } from 'react-redux';
import store from '@/lib/redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateToken } from '@/lib/redux/features/auth/slice/tokenHandlerSlice';

export default function Providers({ children, token }: { children: React.ReactNode; token?: string }) {

  return (
    <Provider store={store}>
      <TokenInitializer token={token} />
      {children}
    </Provider>
  );
}

function TokenInitializer({ token }: { token?: string }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(updateToken(token));
    }
  }, [token]);

  return null;
}
