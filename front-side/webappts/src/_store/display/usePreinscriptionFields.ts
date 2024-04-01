import {Preinscription, PreinscriptionFields} from "../../types/preinscription";
import {useDrugStore} from "../drug.store";

export default function usePreinscriptionFields (preinscriptions: Preinscription[]) {

    const drugs = useDrugStore();
    const getDate = (modifDate: string) => {
        const modificationDate = new Date(Date.parse(modifDate));
        const time = {
            date: `${modificationDate.toLocaleDateString()}`,
            time: `${modificationDate.getHours()}:${modificationDate.getMinutes()}:${modificationDate.getSeconds()}`
        }
        return time;
    }

     const fieldsData: PreinscriptionFields[] = preinscriptions.map((preinscription, id) => {
         // const date = getDate(preinscription.date as string);


         const fields: PreinscriptionFields = {
             indication: preinscription.indication,
             period: preinscription.period,
             id: preinscription.id
        };
        return fields;
    });
    return fieldsData
}