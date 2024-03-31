import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {backend} from "../_api/instances";
import {Patient, Sex} from "../types/patient";
import useApi from "../_hooks/useApi";
import {useLoaderContext} from "../components/loader/useLoader";
import {PatientsConfRoutes} from "../_api/endPoints";

export interface PatientPayload {firstName: string, lastName: string, birthDay: string, sex: Sex, email: string }
export interface PatientValue {
    data: Patient[]
    setData: (v: Patient[]) => void,
    addNew: (patient:PatientPayload) => void,
}

const patient = createContext<PatientValue | undefined>(undefined);
export const PatientProvider = ({ children } : PropsWithChildren) => {
    const [analyses, setPatients] = useState<Patient[]>([]);
    const [response, error, loading, fetch] = useApi();
    const [createResponse, createError, createLoading, createFetch] = useApi();

    useEffect(() => {
        fetch(PatientsConfRoutes.getAll)
    }, [ createResponse]);

    useEffect(() => {
        if (response?.data){
            const files: Patient[] = response.data;
            setPatients( [...files] )
        }
    }, [response]);

    const setData = (data: Patient[]) => {
        console.log("refresh data");
    }

    const addNew = (patient:PatientPayload) => {
        createFetch({
            ...PatientsConfRoutes.addNew,
            requestConfig: [
                patient
            ]
        } )
    }


    return (
        <patient.Provider value={ {data: analyses, setData, addNew} }>
            {children}
        </patient.Provider>
    );
};


export const usePatientStore = () => {
    const context = useContext(patient);
    if (!context) throw new Error('usePatient must be used within a DisplayContext');
    return context;
};
