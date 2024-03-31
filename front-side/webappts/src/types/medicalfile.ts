export interface MedicalFile {
    fileNumber: number,
    creationDate: Date | string,
    modificationDate: Date | string,
    patientId: number
}

export interface MedicalFileFields  {
    modificationDate:string,
    patientName:string,
    creationDate?:string,
    fileNumber?: number
}
