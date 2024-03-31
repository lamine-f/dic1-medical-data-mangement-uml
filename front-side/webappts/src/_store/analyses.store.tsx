import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {backend} from "../_api/instances";
import {Analyse} from "../types/analyse";
import useApi from "../_hooks/useApi";
import {useLoaderContext} from "../components/loader/useLoader";
import {AnalysesConfRoutes} from "../_api/endPoints";

export interface AnalyseValue {
    data: Analyse[]
    setData: (v: Analyse[]) => void,
    addNew: (analyse:{id: number, description: string, observation: string}) => void,
    id: number,
    setId: (v: number) => void
}

const consultationSheet = createContext<AnalyseValue | undefined>(undefined);
export const AnalyseProvider = ({ children } : PropsWithChildren) => {
    const [analyses, setAnalyses] = useState<Analyse[]>([]);
    const [id, setId] = useState<number>(0);
    const [response, error, loading, fetch] = useApi();
    const [createResponse, createError, createLoading, createFetch] = useApi();

    useEffect(() => {
        if (id !== 0)
            fetch({
                ...AnalysesConfRoutes.getAll,
                url: AnalysesConfRoutes.getAll.url+id, method: "GET", axiosInstance:backend})
    }, [id, createResponse]);

    useEffect(() => {
        if (response?.data){
            const files: Analyse[] = response.data;
            setAnalyses( [...files] )
        }
    }, [response]);

    const setData = (data: Analyse[]) => {
        console.log("refresh data");
    }

    const addNew = (analyse:{id: number, description: string, observation: string}) => {
        createFetch({
            ...AnalysesConfRoutes.addNew,
            url: AnalysesConfRoutes.addNew.url+id,
            requestConfig: [
                {
                    "date": new Date().toJSON(),
                    "description": analyse.description,
                    "observation": analyse.observation
                }
            ]
        } )
    }


    return (
        <consultationSheet.Provider value={ {data: analyses, setData, id, setId, addNew} }>
            {children}
        </consultationSheet.Provider>
    );
};


export const useAnalyseStore = () => {
    const context = useContext(consultationSheet);
    if (!context) throw new Error('useAnalyse must be used within a DisplayContext');
    return context;
};
