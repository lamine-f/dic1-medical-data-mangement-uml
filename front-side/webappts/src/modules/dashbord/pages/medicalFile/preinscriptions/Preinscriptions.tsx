import styles from "./Preinscriptions.module.css";
import {useEffect, useState} from "react";
import SearchBar from "../../../../../sharedComponents/searchbar/SearchBar";

import {useNavigate, useParams} from "react-router-dom";
import {AnalyseProvider,} from "../../../../../_store/analyses.store";
import {Cell, HRow, HRowClickButton, Row, RowClickButton, Table} from "../../../../../sharedComponents/table/Table";
import Form from "../../../components/form/Form";
import InputText from "../../../../../sharedComponents/inputText/InputText.component";
import {PreinscriptionProvider, usePreinscriptionStore} from "../../../../../_store/preinscription.store";
import usePreinscriptionFields from "../../../../../_store/display/usePreinscriptionFields";
import {Preinscription, PreinscriptionFields} from "../../../../../types/preinscription";
import StuffPicker from "../../../../../sharedComponents/stuffPicker/StuffPicker";
import {DrugProvider, useDrugStore} from "../../../../../_store/drug.store";
import {Drug} from "../../../../../types/drug";

function Preinscriptions () {

    const drugStore = useDrugStore();
    const [drug, setDrug] = useState<Drug>();
    const [indication, setIndication] = useState<string>("");
    const [period, setPeriod] = useState<string>("");
    const [form, setForm] = useState<boolean>(false);
    const {  sheetNumber } = useParams();
    const store = usePreinscriptionStore();
    const [fields, setFields] = useState< PreinscriptionFields | PreinscriptionFields[]>([]);
    const fieldsData = usePreinscriptionFields(store.data);
    // const navigate = useNavigate();

    const [choosedPreinscription, setChoosedPreinscription] = useState<PreinscriptionFields>();

    useEffect(() => {
        store.setId(parseInt(sheetNumber as string));
        setFields(
            fieldsData
        );
    }, [store]);

    useEffect(() => {
        if (store.createdResponse && drugStore.currentDrug) {
            drugStore.addDrugToPreinscription(drugStore.currentDrug.id, store.createdResponse.id );
        }
    }, [store.createdResponse, drugStore.currentDrug]);

    const getInput = (value: string) => {
        const newFieldsData = (fieldsData as PreinscriptionFields[] ).filter( fi => (fi.indication?.toLowerCase().includes(value.toLowerCase())) )
        setFields( newFieldsData )
    }

    return <section className={styles.wrapper} >
        <div className={styles.container} >
            <SearchBar getInput={getInput} />
            <Table
                hrowButtonActions={<HRowClickButton action={() => {setForm(true)}} value={"Ajouter"} />}
                name={"Preinscriptions"}
                hrow={
                    <HRow>
                        <Cell value={"Indications"}/>
                        <Cell value={"Période"}/>
                    </HRow>
                }
                row={
                    (fields as PreinscriptionFields[]).map((value, id) =>
                        <Row
                            key={id}
                            actionButton={<div style={{display: "flex", gap: "10px"}} >
                                <RowClickButton value={"voir"}  action={() => {setChoosedPreinscription(value)}} />
                                {/*<RowClickButton value={"éditer"}  action={() => {}} />*/}
                            </div>}
                            children={<>
                                <Cell value={value.indication} />
                                <Cell value={value.period} />
                            </>}
                        /> )
                }
            />

            <Form
                title={"Ajouter une préinscription"}
                validAction={() => {
                    store.addNew({indication, period, id: store.id})
                }}
                show={form}
                setShow={setForm}
                inputsText={<>
                    <InputText type={"text"} required={false} onChange={(e) => {setIndication(e.target.value)}} label={"Indication"}  />
                    <InputText type={"text"} required={false} onChange={(e) => {setPeriod(e.target.value)}} label={"Période de prise"}  />
                    <StuffPicker keys={{designation: "Designation"}} data={drugStore.data} setChoice={drugStore.setCurrentDrug} />
                </>}
            />


            <Form
                title={"Médicaments"}
                validAction={() => {setChoosedPreinscription(undefined)}} show={choosedPreinscription !== undefined} inputsText={<>
                    <Drugs preinscription={choosedPreinscription} />
                </>} setShow={() => setChoosedPreinscription(undefined)}
            />

        </div>
    </section>
}

export default function () {
    return <PreinscriptionProvider>
        <DrugProvider>
            <Preinscriptions/>
        </DrugProvider>
    </PreinscriptionProvider>
}

function Drugs ({preinscription}:{preinscription: PreinscriptionFields | undefined}) {

    const drugStore = useDrugStore();

    const [drugsOfPreinscription, setDrugsOfPreinscription] = useState<Drug[] | undefined>();

    useEffect(() => {
        if (preinscription)
            drugStore.getDrugsOfPreinscription(preinscription?.id)
    }, [preinscription]);

    useEffect(() => {
        if (drugStore.drugsOfPreinscription) {
            setDrugsOfPreinscription(drugStore.drugsOfPreinscription);
        }
    }, [drugStore.drugsOfPreinscription]);


    return drugsOfPreinscription && drugsOfPreinscription.length === 0 ? <></>:
        <>
            {
                drugsOfPreinscription?.map(drug => <div> {drug.designation} </div> )
            }
        </>
}