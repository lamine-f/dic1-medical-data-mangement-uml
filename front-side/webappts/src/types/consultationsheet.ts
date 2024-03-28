export interface ConsultationSheet {
    sheetNumber: number,
    creationDate: Date | string,
    modificationDate: Date | string,
    notes: string
}

export interface ConsultationSheetFields  {
    modificationDate:string,
    creationDate?:string,
    sheetNumber?: number,
    notes?: string
}
