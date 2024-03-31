export enum Sex {
    MASCULIN,
    FEMININ,
    AUTRE
}

export interface Patient {
    id: number,
    lastName: string,
    firstName: string,
    sex: Sex,
    birthDay: string,
    email: string
}

export interface PatientFields  {
    id?: number,
    lastName: string,
    firstName: string,
    sex: Sex,
    age: number
}
