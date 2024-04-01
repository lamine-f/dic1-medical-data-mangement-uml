import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {Drug} from "../types/drug";
import useApi from "../_hooks/useApi";
import {DrugsConfRoutes} from "../_api/endPoints";

export interface DrugPayload {designation: string, dateAcquisition: string, dateExpiry: string }
export interface DrugValue {
    data: Drug[]
    setData: (v: Drug[]) => void,
    addNew: (drug:DrugPayload) => void,
    addDrugToPreinscription: (drugId:number, preinscription: number) => void,
    currentDrug: Drug | undefined,
    setCurrentDrug: (v: Drug | undefined) => void,
    getDrugsOfPreinscription: (v: number) => void
    drugsOfPreinscription: Drug[] | undefined;

}

const drugContext = createContext<DrugValue | undefined>(undefined);
export const DrugProvider = ({ children } : PropsWithChildren) => {
    const [drug, setDrugs] = useState<Drug[]>([]);
    const [response, error, loading, fetch] = useApi();
    const [getDrugsOfPreinscriptionResponse, getDrugsOfPreinscriptionError, getDrugsOfPreinscriptionLoading, getDrugsOfPreinscriptionFetch] = useApi();
    const [drugsOfPreinscription, setDrugsOfPreinscription ] = useState<Drug[]|undefined>(undefined)
    const [createResponse, createError, createLoading, createFetch] = useApi();
    const [addToPreinscriptionResponse, addToPreinscriptionError, addToPreinscriptionLoading, addToPreinscriptionFetch] = useApi();
    const [currentDrug, setCurrentDrug] = useState<Drug|undefined>(undefined)

    useEffect(() => {
        fetch(DrugsConfRoutes.getAll)
    }, [ createResponse]);

    useEffect(() => {
        if (response?.data){
            const files: Drug[] = response.data;
            setDrugs( [...files] )
        }
    }, [response]);

    useEffect(() => {
        if (getDrugsOfPreinscriptionResponse) {
            setDrugsOfPreinscription(getDrugsOfPreinscriptionResponse.data)
        }
    }, [getDrugsOfPreinscriptionResponse]);

    const setData = (data: Drug[]) => {
        console.log("refresh data");
    }

    const addNew = (drug:DrugPayload) => {
        createFetch({
            ...DrugsConfRoutes.addNew,
            requestConfig: [
                drug
            ]
        } )
    }

    const addDrugToPreinscription = (drugId:number, preinscriptionId: number) => {

        addToPreinscriptionFetch({
            ...DrugsConfRoutes.addDrugToPreinscription,
            url: DrugsConfRoutes.addDrugToPreinscription.url+"/"+drugId+"/"+preinscriptionId
        })
    }

    const getDrugsOfPreinscription = (preinscriptionId:number) => {
        getDrugsOfPreinscriptionFetch({
            ...DrugsConfRoutes.getAll,
            url: DrugsConfRoutes.getAll.url+"/"+preinscriptionId
        })
    }


    return (
        <drugContext.Provider value={ {data: drug, setData, currentDrug, setCurrentDrug , addNew, addDrugToPreinscription, drugsOfPreinscription, getDrugsOfPreinscription} }>
            {children}
        </drugContext.Provider>
    );
};


export const useDrugStore = () => {
    const context = useContext(drugContext);
    if (!context) throw new Error('useDrug must be used within a DisplayContext');
    return context;
};
