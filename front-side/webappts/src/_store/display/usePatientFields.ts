import {Patient, PatientFields} from "../../types/patient";

export default function usePatientFields (patients: Patient[]):PatientFields[] {

    const getDate = (modifDate: string) => {
        const modificationDate = new Date(Date.parse(modifDate));
        const time = {
            date: `${modificationDate.toLocaleDateString()}`,
            time: `${modificationDate.getHours()}:${modificationDate.getMinutes()}:${modificationDate.getSeconds()}`
        }
        return time;
    }


    const transformBirthDayToYears = (birthDay: string) =>{
        const date = new Date(Date.parse(birthDay));
        return  new Date( Date.now() ).getFullYear() - date.getFullYear()
    }


     const fieldsData: PatientFields[] = patients.map((patient, id) => {
         // const date = getDate(patient.date as string);
         const fields: PatientFields = {
             age: transformBirthDayToYears(patient.birthDay),
             firstName: patient.firstName,
             sex: patient.sex,
             id: patient.id,
             lastName: patient.lastName
        };
        return fields;
    });
    return fieldsData
}