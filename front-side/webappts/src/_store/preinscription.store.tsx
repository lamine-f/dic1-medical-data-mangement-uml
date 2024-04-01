import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {backend} from "../_api/instances";
import {Preinscription} from "../types/preinscription";
import useApi from "../_hooks/useApi";
import {useLoaderContext} from "../components/loader/useLoader";
import {PreinscriptionsConfRoutes} from "../_api/endPoints";

export interface PreinscriptionValue {
    data: Preinscription[]
    setData: (v: Preinscription[]) => void,
    addNew: (preinscription:{id: number, indication: string, period: string}) => void,
    id: number,
    setId: (v: number) => void,
    createdResponse: any
}

const preinscription = createContext<PreinscriptionValue | undefined>(undefined);
export const PreinscriptionProvider = ({ children } : PropsWithChildren) => {
    const [analyses, setPreinscriptions] = useState<Preinscription[]>([]);
    const [id, setId] = useState<number>(0);
    const [response, error, loading, fetch] = useApi();
    const [createResponse, createError, createLoading, createFetch] = useApi();
    const [newResponse, setNewResponse] = useState<Preinscription>();

    useEffect(() => {
        if (id !== 0)
            fetch({
                ...PreinscriptionsConfRoutes.getAll,
                url: PreinscriptionsConfRoutes.getAll.url+id
            })
    }, [id, createResponse]);

    useEffect(() => {
        if (response?.data){
            const files: Preinscription[] = response.data;
            setPreinscriptions( [...files] )
        }
    }, [response]);


    useEffect(() => {
        if (createResponse) {
            setNewResponse(createResponse.data);
        }
    }, [createResponse]);

    const setData = (data: Preinscription[]) => {
        console.log("refresh data");
    }

    const addNew = (preinscription:{id: number, indication: string, period: string}) => {
        createFetch({
            ...PreinscriptionsConfRoutes.addNew,
            url: PreinscriptionsConfRoutes.addNew.url+id,
            requestConfig: [
                {
                    "indication": preinscription.indication,
                    "period": preinscription.period
                }
            ]
        } )
    }


    return (
        <preinscription.Provider value={ {data: analyses, setData, id, setId, addNew, createdResponse: newResponse} }>
            {children}
        </preinscription.Provider>
    );
};


export const usePreinscriptionStore = () => {
    const context = useContext(preinscription);
    if (!context) throw new Error('usePreinscription must be used within a DisplayContext');
    return context;
};
