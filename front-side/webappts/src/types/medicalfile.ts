export interface MedicalFile {
    fileNumber: number,
    creationDate: Date | string,
    modificationDate: Date | string
}

export interface MedicalFileFields  {
    modificationDate:string,
    patientName:string,
    creationDate?:string,
    fileNumber?: number
}
