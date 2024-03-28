import styles from "./Table.module.css"
import {useNavigate} from "react-router-dom";

interface TableProps {
    fields: any,
    data: any | any[],
    next: string

}
export default function Table ({fields, data, next}: TableProps) {

    const navigate = useNavigate();
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
                    data.map((row:any, id: number) => <tr key={id} onClick={() => navigate( row[next].toString() )} >
                            {Object.keys(row).slice(0, data.length-1).map((_, id) => <td key={id} className={styles.column} > {row[fieldsKeys[id]]} </td> )}
                        </tr>
                    )
                }
           </tbody>
        </table>
    </section>

}