import styles from "./Analyses.module.css";
import {useEffect, useState} from "react";
import SearchBar from "../../../../../sharedComponents/searchbar/SearchBar";

import {useNavigate, useParams} from "react-router-dom";
import {AnalyseProvider, useAnalyseStore} from "../../../../../_store/analyses.store";
import useAnalyseFields from "../../../../../_store/display/useAnalyseFields";
import {Analyse, AnalyseFields} from "../../../../../types/analyse";
import {Cell, HRow, HRowClickButton, Row, RowClickButton, Table} from "../../../../../sharedComponents/table/Table";
import Form from "../../../components/form/Form";
import InputText from "../../../../../sharedComponents/inputText/InputText.component";

function Analyses () {

    const [description, setDescription] = useState<string>("");
    const [observation, setObservation] = useState<string>("");
    const [form, setForm] = useState<boolean>(false);
    const {  sheetNumber } = useParams();
    const store = useAnalyseStore();
    const [fields, setFields] = useState< AnalyseFields | AnalyseFields[]>([]);
    const fieldsData = useAnalyseFields(store.data);
    // const navigate = useNavigate();

    useEffect(() => {
        store.setId(parseInt(sheetNumber as string));
        setFields(
            fieldsData
        );
    }, [store]);

    const getInput = (value: string) => {
        const newFieldsData = (fieldsData as Analyse[] ).filter( fi => (fi.description?.toLowerCase().includes(value.toLowerCase())) )
        setFields( newFieldsData )
    }

    return <section className={styles.wrapper} >
        <div className={styles.container} >
            <SearchBar getInput={getInput} />

            <Table
                hrowButtonActions={<HRowClickButton action={() => {setForm(true)}} value={"Ajouter"} />}
                name={"Analyses"}
                hrow={
                    <HRow>
                        <Cell value={"Description"}/>
                        <Cell value={"Observations"}/>
                        <Cell value={"Derniere modification"}/>
                    </HRow>
                }
                row={
                    (fields as AnalyseFields[]).map((value, id) =>
                        <Row
                            key={id}
                            actionButton={<div style={{display: "flex", gap: "10px"}} >
                                {/*<RowClickButton value={"voir"}  action={() => {}} />*/}
                                {/*<RowClickButton value={"éditer"}  action={() => {}} />*/}
                            </div>}
                            children={<>
                                <Cell value={value.description} />
                                <Cell value={value.observation} />
                                <Cell value={`${value.date}`} />
                            </>}
                        /> )
                }
            />

            <Form
                title={"Ajouter une analyse"}
                validAction={() => store.addNew({description, observation, id: store.id})}
                show={form}
                setShow={setForm}
                inputsText={<>
                    <InputText type={"text"} required={false} onChange={(e) => {setDescription(e.target.value)}} label={"Description"}  />
                    <InputText type={"text"} required={false} onChange={(e) => {setObservation(e.target.value)}} label={"Observations"}  />
                </>}
            />

        </div>
    </section>
}

export default function () {
    return <AnalyseProvider>
        <Analyses/>
    </AnalyseProvider>
}