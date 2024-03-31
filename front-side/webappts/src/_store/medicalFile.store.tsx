import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {MedicalFile} from "../types/medicalfile";
import useApi from "../_hooks/useApi";
import {MedicalFileConfRoutes, MedicalFileEndPoints} from "../_api/endPoints";

export interface MedicalFileStoreValue {
    data: MedicalFile[]
    setData: (v: MedicalFile[]) => void,
    addNewMedicalFile: (v: number) => void
}

const MedicalFileStore = createContext<MedicalFileStoreValue | undefined>(undefined);
export const MedicalFileStoreProvider = ({ children } : PropsWithChildren) => {
    const [medicalFiles, setMedicalFiles] = useState<MedicalFile[]>([])
    const [response, error, loading, fetch] = useApi();
    const [creationResponse, creationError, creationLoading, creationFetch] = useApi();

    useEffect(() => {
        fetch(MedicalFileConfRoutes.getAll);
    }, [creationResponse]);

    useEffect(() => {
        if (response?.data){
            const files: MedicalFile[] = response.data;
            setMedicalFiles( [...files] )
        }
    }, [response]);

    const setData = (data: MedicalFile[]) => {
        console.log("refresh data");
    }

    const addNewMedicalFile = (patientId:number) => {
        creationFetch({
            ...MedicalFileConfRoutes.addNew,
            url: MedicalFileConfRoutes.addNew.url+"/"+patientId,
            requestConfig: [
                {
                    "creationDate": new Date().toJSON(),
                    "modificationDate": new Date().toJSON(),
                    "consultationSheets": []
                }
            ]
        })
    }

    return (
        <MedicalFileStore.Provider value={ {data: medicalFiles, setData, addNewMedicalFile} }>
            {children}
        </MedicalFileStore.Provider>
    );
};


export const useMedicalFileStore = () => {
    const context = useContext(MedicalFileStore);
    if (!context) throw new Error('useMedicalFileStore must be used within a DisplayContext');
    return context;
};
