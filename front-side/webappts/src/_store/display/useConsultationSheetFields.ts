import {ConsultationSheet, ConsultationSheetFields} from "../../types/consultationsheet";

export default function useConsultationSheetFields (consultationSheets: ConsultationSheet[]) {

    const getDate = (modifDate: string) => {
        const modificationDate = new Date(Date.parse(modifDate));
        const time = {
            date: `${modificationDate.toLocaleDateString()}`,
            time: `${modificationDate.getHours()}:${modificationDate.getMinutes()}:${modificationDate.getSeconds()}`
        }
        return time;
    }

     const fieldsName: ConsultationSheetFields = {
        modificationDate:"Date de modification",
         notes: "Notes"
    }
     const fieldsData: ConsultationSheetFields[] = consultationSheets.map((consultationSheet, id) => {
         const date = getDate(consultationSheet.modificationDate as string);
         const fields: ConsultationSheetFields = {
            modificationDate: `${date.date} à ${date.time}`,
             notes: consultationSheet.notes,
             sheetNumber: consultationSheet.sheetNumber,
        };
        return fields;
    });
    return [fieldsName, fieldsData]
}