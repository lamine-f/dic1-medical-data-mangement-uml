import styles from "./StuffPicker.module.css"
import SearchBar from "../searchbar/SearchBar";
import Form from "../../modules/dashbord/components/form/Form";
import Table from "../../modules/dashbord/components/table/Table";
import {useState} from "react";
import {Patient} from "../../types/patient";

interface StuffPickerProps {
    keys: any
    data: any[],
    setChoice: (v:any) => any,
}
export default function StuffPicker ({data, setChoice, keys}: StuffPickerProps) {

    const [newChoice, setNewChoice] = useState<any>();
    const [newData, setNewData] = useState<any[]>(data);

    const mainKey = Object.keys(keys)[0];
    const getChoice = (choice: any) => {
        setChoice(choice)
        setNewChoice(choice);
        return choice;
    }

    return <div className={styles.wrapper} >
        <SearchBar getInput={(e) => {
            setNewData(
                data.filter( d => {
                    return d[mainKey]?.toLowerCase().includes(e.toLowerCase())
                } )
            )
        }}/>

        {
            newChoice && <div>
                Sélectionné(e): {newChoice[mainKey]}
            </div>
        }

        <div className={styles.container} >
            <Table fields={keys} data={newData} action={getChoice}/>
        </div>


    </div>
}