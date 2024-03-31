import {MedicalFile, MedicalFileFields} from "../../types/medicalfile";
import {usePatientStore} from "../patient.store";

export default function useMedicalFileFields (medicalFiles: MedicalFile[]) {

    const patientStore = usePatientStore();

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
         const name = patientStore.data.filter( value => value.id == medicalFile.patientId )[0];
         const fields: MedicalFileFields = {
            patientName: name.firstName+" "+name.lastName,
            modificationDate: `${date.date} à ${date.time}`,
             fileNumber: medicalFile.fileNumber
        };
        return fields;
    });
    return fieldsData
}