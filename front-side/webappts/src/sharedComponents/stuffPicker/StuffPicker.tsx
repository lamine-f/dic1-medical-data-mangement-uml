import styles from "./StuffPicker.module.css"
import SearchBar from "../searchbar/SearchBar";
import Form from "../../modules/dashbord/components/form/Form";
import Table from "../../modules/dashbord/components/table/Table";

interface StuffPickerProps {
    keys: any
    data: any[],
    setChoice: (v:any) => any,
}
export default function StuffPicker ({data, setChoice, keys}: StuffPickerProps) {


    const getChoice = (choice: any) => {
        setChoice(choice)
    }

    return <div className={styles.wrapper} >
        <SearchBar getInput={(e) => {}}/>

        <div className={styles.container} >
            <Table fields={keys} data={data} action={getChoice}/>
        </div>


    </div>
}