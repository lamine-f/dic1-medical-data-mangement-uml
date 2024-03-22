import React, {createContext, useContext, useEffect, useState} from 'react';
import {} from "../../_hooks/useLocalStorage";
import {useNavigate} from "react-router-dom";
import {DNA} from "react-loader-spinner";
import Loader from "./Loader";


const LoaderContext = createContext({loading: false,setLoading: () => {}});

export const LoaderProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loading) {
            document.body.style.overflowY = "hidden";
        }else {
            document.body.style.overflowY = "auto";
        }
    }, [loading]);

    return (
        <LoaderContext.Provider value={ {loading, setLoading } }>
            {
                loading && <Loader/>
            }
            {children}
        </LoaderContext.Provider>
    );
};

export const useLoaderContext = () => {
    const context = useContext(LoaderContext);
    if (!context) throw new Error('useConnection must be used within a DisplayContext');
    return context;
};