import {MedicalFile, MedicalFileFields} from "../types/medicalfile";

export default function useMedicalFileFields (medicalFiles: MedicalFile[]) {

    const getDate = (modifDate: string) => {
        const modificationDate = new Date(Date.parse(modifDate));
        const time = {
            date: `${modificationDate.toLocaleDateString()}`,
            time: `${modificationDate.getHours()}:${modificationDate.getMinutes()}:${modificationDate.getSeconds()}`
        }
        return time;
    }


     const fieldsName: MedicalFileFields = {
        patientName:"Nom du Patient",
        modificationDate:"Date de modification",
    }
     const fieldsData: MedicalFileFields[] = medicalFiles.map((medicalFile, id) => {
         const date = getDate(medicalFile.modificationDate as string);
         const fields: MedicalFileFields = {
            patientName: "0"+id+"Undefined",
            modificationDate: `${date.date} à ${date.time}`,
             fileNumber: medicalFile.fileNumber
        };
        return fields;
    });
    return [fieldsName, fieldsData]
}