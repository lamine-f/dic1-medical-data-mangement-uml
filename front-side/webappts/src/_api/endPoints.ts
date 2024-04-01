import {backend} from "./instances";
import {RequestConfig} from "../_hooks/useApi";

export enum MedicalFileEndPoints {
    getAll="medicalFiles",
    add="medicalFiles"
}

export enum ConsultationSheetsEndPoints {
    getAll="medicalFiles/consultationSheets",
    add="medicalFiles/consultationSheets"
}

interface MedicalFileConfRoutesValues {
    getAll: RequestConfig,
    addNew: RequestConfig,
}
export const MedicalFileConfRoutes: MedicalFileConfRoutesValues = {
    getAll: {
        url: MedicalFileEndPoints.getAll,
        method: "GET",
        axiosInstance:backend
    },

    addNew: {
        url: MedicalFileEndPoints.add,
        method: "PUT",
        axiosInstance:backend,
        requestConfig: []
    },
}



interface ConsultationSheetsConfRoutesValues {
    getAll: RequestConfig,
    addNew: RequestConfig
}
const ConsultationSheetsConfRoute = "medicalFiles/consultationSheets"
export const ConsultationSheetsConfRoutes: ConsultationSheetsConfRoutesValues = {
    getAll: {
        url: ConsultationSheetsConfRoute,
        method: "GET",
        axiosInstance:backend
    },

    addNew: {
        url: ConsultationSheetsConfRoute,
        method: "PUT",
        axiosInstance:backend,
        requestConfig: []
    },
}


interface AnalysesConfRoutesValues {
    getAll: RequestConfig,
    addNew: RequestConfig
}
const AnalysesConfRoute = "medicalFiles/consultationSheets/analyses/"
export const AnalysesConfRoutes: AnalysesConfRoutesValues = {
    getAll: {
        url: AnalysesConfRoute,
        method: "GET",
        axiosInstance:backend
    },

    addNew: {
        url: AnalysesConfRoute,
        method: "PUT",
        axiosInstance:backend,
        requestConfig: []
    },
}


interface PreinscriptionsConfRoutesValues {
    getAll: RequestConfig,
    addNew: RequestConfig
}
const PreinscriptionsConfRoute = "medicalFiles/consultationSheets/preinscriptions/"
export const PreinscriptionsConfRoutes: PreinscriptionsConfRoutesValues = {
    getAll: {
        url: PreinscriptionsConfRoute,
        method: "GET",
        axiosInstance:backend
    },

    addNew: {
        url: PreinscriptionsConfRoute,
        method: "PUT",
        axiosInstance:backend,
        requestConfig: []
    },
}

interface PatientsConfRoutesValues {
    getAll: RequestConfig,
    addNew: RequestConfig
}
const PatientsConfRoute = "patients"
export const PatientsConfRoutes: PatientsConfRoutesValues = {
    getAll: {
        url: PatientsConfRoute,
        method: "GET",
        axiosInstance:backend
    },

    addNew: {
        url: PatientsConfRoute,
        method: "PUT",
        axiosInstance:backend,
        requestConfig: []
    },
}

interface DrugsConfRoutesValues {
    getAll: RequestConfig,
    addNew: RequestConfig,
    addDrugToPreinscription: RequestConfig

}
const DrugsConfRoute = "medicalFiles/consultationSheets/drugs"
export const DrugsConfRoutes: DrugsConfRoutesValues = {
    getAll: {
        url: DrugsConfRoute,
        method: "GET",
        axiosInstance:backend
    },

    addNew: {
        url: DrugsConfRoute,
        method: "PUT",
        axiosInstance:backend,
        requestConfig: []
    },

    addDrugToPreinscription: {
        url: DrugsConfRoute,
        method: "PATCH",
        axiosInstance:backend,
        requestConfig: []
    },
}
