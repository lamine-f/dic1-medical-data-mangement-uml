import styles from "./MedicalFile.module.css";
import {useEffect, useState} from "react";
import useMedicalFileFields from "../../../../_store/display/useMedicalFileFields";
import SearchBar from "../../../../sharedComponents/searchbar/SearchBar";
import {MedicalFileStoreProvider, useMedicalFileStore} from "../../../../_store/medicalFile.store";
import {MedicalFileFields} from "../../../../types/medicalfile";
import {Cell, HRow, HRowClickButton, Row, RowClickButton, Table} from "../../../../sharedComponents/table/Table";
import {useNavigate} from "react-router-dom";
import Form from "../../components/form/Form";
import InputText from "../../../../sharedComponents/inputText/InputText.component";
import StuffPicker from "../../../../sharedComponents/stuffPicker/StuffPicker";
import {PatientProvider, usePatientStore} from "../../../../_store/patient.store";
import usePatientFields from "../../../../_store/display/usePatientFields";

export default function MedicalFileComponent () {
    return <MedicalFileStoreProvider>
        <PatientProvider>
            <MedicalFileChild/>
        </PatientProvider>
    </MedicalFileStoreProvider>
}

function MedicalFileChild () {
    const [form, setForm] = useState<boolean>(false);
    const store = useMedicalFileStore();
    const [fields, setFields] = useState<MedicalFileFields[] >([]);
    const  fieldsData = useMedicalFileFields(store.data);
    useEffect(() => {
        setFields(
            fieldsData
        )
    }, [store]);
    const navigate = useNavigate();
    const getInput = (value: string) => {
        const newFieldsData = (fieldsData as MedicalFileFields[] ).filter( fi => (fi.patientName.toLowerCase().includes(value.toLowerCase())) )
        setFields(prevState => ( newFieldsData))
    }

    const [patient, setPatient] = useState<any>();
    const patientStore = usePatientStore();


    return <section className={styles.wrapper} >
        <div className={styles.medicalFilesContainer} >
            <SearchBar getInput={getInput} />
            <Table
                hrowButtonActions={<HRowClickButton key={1} value={"Ajouter"} action={() => setForm(true)} />}
                name={"Dossiers médicaux"}
                hrow={
                    <HRow>
                        <Cell value={"Numéro de dossier"}/>
                        <Cell value={"Patient"}/>
                        <Cell value={"Date de derniere modification"}/>
                    </HRow>
                }
                row={
                    (fields as MedicalFileFields[])?.map((value, id) => (
                        <Row
                            key={id}
                            actionButton={<RowClickButton value={"Voir"} action={() => {navigate( `${value.fileNumber}` )}} />}
                        >
                            <Cell value={`${value.fileNumber}`}/>
                            <Cell value={value.patientName}/>
                            <Cell value={value.modificationDate}/>
                        </Row>
                    ))
                }
            />

            <Form
                title={"Créer un nouveau dossier médical"}
                validAction={() => {store.addNewMedicalFile(patient.id)}}
                show={form}
                setShow={setForm}
                inputsText={<>
                    <StuffPicker
                        keys={{firstName: "Prénom(s)", lastName: "Nom", age: "Age" }}
                        data={usePatientFields(patientStore.data)}
                        setChoice={setPatient}
                    />
                </>}
            />
        </div>
    </section>
}