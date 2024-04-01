import styles from "./Patient.module.css"
import {useNavigate} from "react-router-dom";
import {Cell, HRow, HRowClickButton, Row, RowClickButton, Table} from "../../../../sharedComponents/table/Table";
import SearchBar from "../../../../sharedComponents/searchbar/SearchBar";
import Form from "../../components/form/Form";
import {PatientPayload, PatientProvider, usePatientStore} from "../../../../_store/patient.store";
import {useEffect, useState} from "react";
import {PatientFields, Sex} from "../../../../types/patient";
import usePatientFields from "../../../../_store/display/usePatientFields";
import InputText from "../../../../sharedComponents/inputText/InputText.component";
import SelectInput, {Options} from "../../../../sharedComponents/selectInput/SelectInput";

function PatientContent () {
    const [patient, setPatient] = useState<PatientPayload>({
        firstName: "",
        lastName: "",
        sex: Sex.AUTRE,
        birthDay: "",
        email: ""
    });
    const [form, setForm] = useState<boolean>(false);
    const store = usePatientStore();
    const [fields, setFields] = useState<PatientFields[]>([]);
    const fieldsData = usePatientFields(store.data);
    useEffect(() => {
        setFields(
            fieldsData
        )
    }, [store]);
    const navigate = useNavigate();
    const getInput = (value: string) => {
        const newFieldsData = (fieldsData as PatientFields[] ).filter( fi => (fi.lastName.toLowerCase().includes(value.toLowerCase())) )
        setFields(prevState => ( newFieldsData ))
    }

    return <section className={styles.wrapper} >
        <div className={styles.medicalFilesContainer} >
            <SearchBar getInput={getInput} />
            <Table
                hrowButtonActions={<HRowClickButton key={1} value={"Ajouter"} action={() => setForm(true)} />}
                name={"Patients"}
                hrow={
                    <HRow>
                        <Cell value={"Nom"}/>
                        <Cell value={"Prénom(s)"}/>
                        <Cell value={"Sexe"}/>
                        <Cell value={"Age"}/>
                    </HRow>
                }
                row={
                    (fields as PatientFields[]).map((value, id) => (
                    <Row
                    key={id}
                actionButton={<></>}
            >
                <Cell value={`${value.lastName}`}/>
                <Cell value={value.firstName}/>
                <Cell value={`${value.sex}`}/>
                <Cell value={`${value.age}`}/>
            </Row>
            ))
            }
        />
        <Form
            title={"Ajouter un patient"}
            validAction={() => {store.addNew(patient)}}
            show={form}
            setShow={setForm}
            inputsText={<>
                <InputText type={"text"} required={true} label={"Prénom(s)"} onChange={(e) => setPatient( v => ({...v, firstName: e.target.value}) )} />
                <InputText type={"text"} required={true} label={"Nom"} onChange={(e) => setPatient( v => ({...v, lastName: e.target.value}) )} />
                <InputText type={"email"} required={true} label={"Email"} onChange={(e) => setPatient( v => ({...v, email: e.target.value}) )} />
                <SelectInput
                    getSelected={ (sexe) => setPatient( v => ({...v, sex: sexe  }) )}
                    label={"Sexe"}
                    options={[
                        <Options label={"Masculin"} value={Sex.MASCULIN} />,
                        <Options label={"Féminin"} value={Sex.FEMININ} />,
                        <Options label={"Autre"} value={Sex.AUTRE} />,
                ]} />
                <InputText height={"100px"} type={"date"} required={true} label={"Date de naissance"} onChange={(e) => setPatient( v => ({...v, birthDay: e.target.value}) )} />
            </>}
        />
    </div>
</section>
}


export default function Patient () {
    return <PatientProvider>
        <PatientContent/>
    </PatientProvider>
}