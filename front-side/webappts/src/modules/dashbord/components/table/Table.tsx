import styles from "./Table.module.css"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

interface TableProps {
    fields: any,
    data: any | any[],
    action: (v:any) => any
    prev?: any
}
export default function Table ({fields, data, action, prev}: TableProps) {
    const [selectedRow, setSelectedRow] = useState<any>({});
    const fieldsKeys = Object.keys(fields);
    return <section className={styles.wrapper} >
        <table className={styles.table} >
            <thead className={styles.tableHead} >
            <tr>
                {fieldsKeys.map((fieldsKey, id) => <th key={id} >{fields[fieldsKey]}</th>)}
            </tr>
            </thead>
            <tbody className={styles.tbody} >
                {
                    data.map((row:any, id: number) => <tr  className={`${styles.row}  ${ selectedRow.id1 == row && styles.rowChoice}` } key={id} onClick={() => {
                        setSelectedRow({id1: action(row) });
                        } } >
                            {fieldsKeys.map((fieldsKey, id) => <>  <td key={id} className={styles.column} > {row[fieldsKeys[id]]} </td> </> )}
                        </tr>
                    )
                }
           </tbody>
        </table>
    </section>

}