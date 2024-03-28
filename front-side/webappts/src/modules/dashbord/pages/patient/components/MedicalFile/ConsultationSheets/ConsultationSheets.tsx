import styles from "./ConsultationSheets.module.css";
import {useEffect, useState} from "react";
import {MedicalFileFields} from "../../../../../../../types/medicalfile";
import SearchBar from "../../../../../../../sharedComponents/searchbar/SearchBar";
import Table from "../../../../../components/table/Table";
import {
    ConsultationSheetProvider,
    useConsultationSheetStore
} from "../../../../../../../_store/consultationSheets.store";
import useConsultationSheetFields from "../../../../../../../_hooks/useConsultationSheetFields";
import {useParams} from "react-router-dom";

function ConsultationSheets () {


    const { id } = useParams();
    const store = useConsultationSheetStore();
    store.setId(parseInt(id as string));
    const [fields, setFields] = useState<{fieldsName: any, fieldsData: any | any[] }>({fieldsName:{}, fieldsData:[]});
    const [fieldsName, fieldsData ] = useConsultationSheetFields(store.data);

    useEffect(() => {
        setFields({
            fieldsName,
            fieldsData
        });

        console.log(fieldsData)
    }, [store]);

    const getInput = (value: string) => {
        const newFieldsData = (fieldsData as MedicalFileFields[] ).filter( fi => (fi.patientName.toLowerCase().includes(value.toLowerCase())) )
        setFields(prevState => ({...prevState, fieldsData: newFieldsData}))
    }

    return <section className={styles.wrapper} >
        <div className={styles.container} >
            <SearchBar getInput={getInput} />
            <Table
                fields={fields.fieldsName}
                data={fields.fieldsData}
                next={"sheetNumber"}
            />
        </div>
    </section>
}

export default function () {
    return <ConsultationSheetProvider>
        <ConsultationSheets/>
    </ConsultationSheetProvider>
}