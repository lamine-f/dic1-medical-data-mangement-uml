import styles from "./ConsultationSheets.module.css";
import {useEffect, useState} from "react";
import {MedicalFileFields} from "../../../../../types/medicalfile";
import SearchBar from "../../../../../sharedComponents/searchbar/SearchBar";
import {
    ConsultationSheetProvider,
    useConsultationSheetStore
} from "../../../../../_store/consultationSheets.store";
import useConsultationSheetFields from "../../../../../_store/display/useConsultationSheetFields";
import {useNavigate, useParams} from "react-router-dom";
import {ConsultationSheetFields} from "../../../../../types/consultationsheet";
import {Cell, HRow, HRowClickButton, Row, RowClickButton, Table} from "../../../../../sharedComponents/table/Table";
import Form from "../../../components/form/Form";
import InputText from "../../../../../sharedComponents/inputText/InputText.component";

function ConsultationSheets () {

    const [form, setForm] = useState<boolean>(false);
    const [notes, setNotes] = useState<string>("");
    const { id } = useParams();
    const store = useConsultationSheetStore();
    const [fields, setFields] = useState<{fieldsName: any, fieldsData: any | any[] }>({fieldsName:{}, fieldsData:[]});
    const [fieldsName, fieldsData ] = useConsultationSheetFields(store.data);
    const navigate = useNavigate();

    useEffect(() => {
        store.setId(parseInt(id as string));
        setFields({
            fieldsName,
            fieldsData
        });
    }, [store]);

    const getInput = (value: string) => {
        const newFieldsData = (fieldsData as ConsultationSheetFields[] ).filter( fi => (fi.notes?.toLowerCase().includes(value.toLowerCase())) )
        setFields(prevState => ({...prevState, fieldsData: newFieldsData}))
    }

    const fieldsNameKeys = Object.keys(fieldsName);
    const fieldsNameValues = Object.values(fieldsName);

    return <section className={styles.wrapper} >
        <div className={styles.container} >
            <SearchBar getInput={getInput} />

            <Table
                name={"Fichiers de consultation"}
                hrowButtonActions={<HRowClickButton value={"Ajouter"} action={() => setForm(true)} />}
                hrow={
                    <HRow>
                        <Cell value={"Notes"}/>
                        <Cell value={"Date de derniere modification"}/>
                    </HRow>
                }

                row={
                    (fieldsData as ConsultationSheetFields[]).map((value, id) => (
                        <Row
                            key={id}
                            actionButton={<RowClickButton value={"Voir"} action={() => {navigate( `${value.sheetNumber}` )}} />}
                        >
                            <Cell value={`${value.notes}`}/>
                            <Cell value={value.modificationDate}/>
                        </Row>
                    ))
                }

            />

            <Form
                title={"Créer une nouvelle fiche de consultation"}
                validAction={() => {store.addNew(store.id, notes)}}
                show={form}
                setShow={setForm}
                inputsText={<>
                    <InputText
                        required={true}
                        label={"Notes"}
                        type={"text"}
                        onChange={ (e) => setNotes(e.target.value) }
                    />
                </>}
            />

        </div>
    </section>
}

export default function () {
    return <ConsultationSheetProvider>
        <ConsultationSheets/>
    </ConsultationSheetProvider>
}