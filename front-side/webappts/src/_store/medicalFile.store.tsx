import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {backend} from "../_api/instances";
import {MedicalFile} from "../types/medicalfile";
import useApi from "../_hooks/useApi";
import {useLoaderContext} from "../components/loader/useLoader";

export interface MedicalFileStoreValue {
    data: MedicalFile[]
    setData: (v: MedicalFile[]) => void,
}

const MedicalFileStore = createContext<MedicalFileStoreValue | undefined>(undefined);
export const MedicalFileStoreProvider = ({ children } : PropsWithChildren) => {
    const [medicalFiles, setMedicalFiles] = useState<MedicalFile[]>([])
    const [response, error, loading, fetch] = useApi();

    useEffect(() => {
        fetch({url: "medicalFiles", method: "GET", axiosInstance:backend})
    }, []);

    useEffect(() => {
        if (response?.data){
            const files: MedicalFile[] = response.data;
            setMedicalFiles( [...files] )
        }
    }, [response]);

    const setData = (data: MedicalFile[]) => {
        console.log("refresh data");
    }
    return (
        <MedicalFileStore.Provider value={ {data: medicalFiles, setData} }>
            {children}
        </MedicalFileStore.Provider>
    );
};


export const useMedicalFileStore = () => {
    const context = useContext(MedicalFileStore);
    if (!context) throw new Error('useMedicalFileStore must be used within a DisplayContext');
    return context;
};
