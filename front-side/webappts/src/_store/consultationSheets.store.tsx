import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {backend} from "../_api/instances";
import {ConsultationSheet} from "../types/consultationsheet";
import useApi from "../_hooks/useApi";
import {useLoaderContext} from "../components/loader/useLoader";
import {ConsultationSheetsConfRoutes} from "../_api/endPoints";

export interface ConsultationSheetValue {
    data: ConsultationSheet[]
    setData: (v: ConsultationSheet[]) => void,
    addNew: (id: number, notes: string) => void,
    id: number,
    setId: (v: number) => void
}

const consultationSheet = createContext<ConsultationSheetValue | undefined>(undefined);
export const ConsultationSheetProvider = ({ children } : PropsWithChildren) => {
    const [consultationSheets, setConsultationSheets] = useState<ConsultationSheet[]>([]);
    const [id, setId] = useState<number>(0);
    const [response, error, loading, fetch] = useApi();
    const [createResponse, createError, createLoading, createFetch] = useApi();

    useEffect(() => {
        if (id !== 0)
            fetch({url: "medicalFiles/consultationSheets/"+id, method: "GET", axiosInstance:backend})
    }, [id, createResponse]);

    useEffect(() => {
        if (response?.data){
            const files: ConsultationSheet[] = response.data;
            setConsultationSheets( [...files] )
        }
    }, [response]);

    const setData = (data: ConsultationSheet[]) => {
        console.log("refresh data");
    }

    const addNew = (id: number, notes: string) => {
        createFetch({
            ...ConsultationSheetsConfRoutes.addNew,
            url: ConsultationSheetsConfRoutes.addNew.url+"/"+id,
            requestConfig: [
                {
                    "creationDate": new Date().toJSON(),
                    "modificationDate": new Date().toJSON(),
                    notes
                }
            ]

        } )
    }


    return (
        <consultationSheet.Provider value={ {data: consultationSheets, setData, id, setId, addNew} }>
            {children}
        </consultationSheet.Provider>
    );
};


export const useConsultationSheetStore = () => {
    const context = useContext(consultationSheet);
    if (!context) throw new Error('useConsultationSheet must be used within a DisplayContext');
    return context;
};
