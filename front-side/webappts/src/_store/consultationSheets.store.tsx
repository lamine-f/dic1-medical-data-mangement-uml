import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {backend} from "../_api/instances";
import {ConsultationSheet} from "../types/consultationsheet";
import useApi from "../_hooks/useApi";
import {useLoaderContext} from "../components/loader/useLoader";

export interface ConsultationSheetValue {
    data: ConsultationSheet[]
    setData: (v: ConsultationSheet[]) => void,
    id: number,
    setId: (v: number) => void
}

const consultationSheet = createContext<ConsultationSheetValue | undefined>(undefined);
export const ConsultationSheetProvider = ({ children } : PropsWithChildren) => {
    const [consultationSheets, setConsultationSheets] = useState<ConsultationSheet[]>([]);
    const [id, setId] = useState<number>(0);
    const [response, error, loading, fetch] = useApi();

    useEffect(() => {
        fetch({url: "medicalFiles/consultationSheets/"+id, method: "GET", axiosInstance:backend})
    }, [id]);

    useEffect(() => {
        if (response?.data){
            const files: ConsultationSheet[] = response.data;
            setConsultationSheets( [...files] )
        }
    }, [response]);

    const setData = (data: ConsultationSheet[]) => {
        console.log("refresh data");
    }
    return (
        <consultationSheet.Provider value={ {data: consultationSheets, setData, id, setId} }>
            {children}
        </consultationSheet.Provider>
    );
};


export const useConsultationSheetStore = () => {
    const context = useContext(consultationSheet);
    if (!context) throw new Error('useConsultationSheet must be used within a DisplayContext');
    return context;
};
