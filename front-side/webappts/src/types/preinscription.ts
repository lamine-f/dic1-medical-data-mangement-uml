export interface Preinscription {
    id: number,
    indication: string,
    period: string,
}

export interface PreinscriptionFields  {
    indication: string,
    period: string,
    id: number,
    drugDesignation?: string[]
}
