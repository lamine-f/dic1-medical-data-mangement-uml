import {Analyse, AnalyseFields} from "../../types/analyse";

export default function useAnalyseFields (analyses: Analyse[]) {

    const getDate = (modifDate: string) => {
        const modificationDate = new Date(Date.parse(modifDate));
        const time = {
            date: `${modificationDate.toLocaleDateString()}`,
            time: `${modificationDate.getHours()}:${modificationDate.getMinutes()}:${modificationDate.getSeconds()}`
        }
        return time;
    }

     const fieldsData: AnalyseFields[] = analyses.map((analyse, id) => {
         const date = getDate(analyse.date as string);
         const fields: AnalyseFields = {
             date: `${date.date} à ${date.time}`,
             description: analyse.description,
             observation: analyse.observation,
             id: analyse.id
        };
        return fields;
    });
    return fieldsData
}