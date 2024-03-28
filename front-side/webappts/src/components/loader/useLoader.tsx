import React, {createContext, useContext, useEffect, useState} from 'react';
import Loader from "./Loader";
import {PropsWithChildren} from "react";

interface LoaderContextValue  {
    loading: boolean,
    setLoading: (ar: boolean) => void
}

const LoaderContext = createContext<LoaderContextValue | undefined>(undefined);
export const LoaderProvider = ({ children }: PropsWithChildren) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (loading) {
            document.body.style.overflowY = "hidden";
        }else {
            document.body.style.overflowY = "auto";
        }
    }, [loading]);

    return (
        <LoaderContext.Provider value={{loading, setLoading}}>
            {loading && <Loader/>}
            {children}
        </LoaderContext.Provider>
    );
};

export const useLoaderContext = () => {
    const context = useContext(LoaderContext);
    if (!context) throw new Error('useConnection must be used within a DisplayContext');
    return context;
};