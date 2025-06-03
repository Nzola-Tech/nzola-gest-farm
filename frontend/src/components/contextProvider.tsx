import { DbProvider } from '@/context/db';
import React from 'react';

export const ContextProvider = ({children}: {children: React.ReactNode}) =>{
    return (
        <>
            <DbProvider>
                {children}
            </DbProvider>
        </>
    );
}
