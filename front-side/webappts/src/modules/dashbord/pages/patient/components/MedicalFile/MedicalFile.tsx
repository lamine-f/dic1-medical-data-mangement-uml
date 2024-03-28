import styles from "./MedicalFile.module.css";
import {useEffect, useState} from "react";
import Table from "../../../../components/table/Table";
import useMedicalFileFields from "../../../../../../_hooks/useMedicalFileFields";
import SearchBar from "../../../../../../sharedComponents/searchbar/SearchBar";
import {MedicalFileStoreProvider, useMedicalFileStore} from "../../../../../../_store/medicalFile.store";
import {MedicalFileFields} from "../../../../../../types/medicalfile";

export default function MedicalFileComponent () {
    return <MedicalFileStoreProvider>
        <MedicalFileChild/>
    </MedicalFileStoreProvider>
}

function MedicalFileChild () {
    const store = useMedicalFileStore();
    const [fields, setFields] = useState<{fieldsName: any, fieldsData: any | any[] }>({fieldsName:{}, fieldsData:[]});
    const [fieldsName, fieldsData ] = useMedicalFileFields(store.data);
    useEffect(() => {
        setFields({
            fieldsName,
            fieldsData
        })
    }, [store]);
    const getInput = (value: string) => {
        const newFieldsData = (fieldsData as MedicalFileFields[] ).filter( fi => (fi.patientName.toLowerCase().includes(value.toLowerCase())) )
        setFields(prevState => ({...prevState, fieldsData: newFieldsData}))
    }
    return <section className={styles.wrapper} >
        <div className={styles.medicalFilesContainer} >
            <SearchBar getInput={getInput} />
            <Table
                fields={fields.fieldsName}
                data={fields.fieldsData}
                next={"fileNumber"}
            />
        </div>
    </section>
}