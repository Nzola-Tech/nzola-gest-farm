import { DbProvider } from '@/context/db';
import { PdvProvider } from '@/context/pdv';
import React from 'react';

export const ContextProvider = ({children}: {children: React.ReactNode}) =>{
    return (
        <>
            <DbProvider>
                <PdvProvider>
                    {children}
                </PdvProvider>
            </DbProvider>
        </>
    );
}
