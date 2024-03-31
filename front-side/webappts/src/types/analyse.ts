export interface Analyse {
    id: number,
    date: Date | string,
    observation: string,
    description: string
}

export interface AnalyseFields  {
    date: Date | string,
    observation: string,
    description: string
    id?: number
}
