import styles from "./InputText.module.css"
import {useEffect, useState} from "react";


const labelStyle = {
    top: "-5px",
    left: "0",
    fontSize: "small",
    padding: "0 10px"
}
export default function InputText ({label, placeholder, onChange, width, height, type, required}) {
    const [value, setValue] = useState("");
    const [error, setError] = useState({error: false, message: ""});

    useEffect(() => {
        if (required) {
            value !== "" ?
            setError( e => ({...e, error:false, message: "" }))
                :
            setError( e => ({...e, error:true, message: "Required" }))
        }
    }, [value]);

    return <section className={styles.wrapper} >
        <div className={styles.inputContainer} style={{width, height}} >
            <label htmlFor={"input"} className={styles.label} >
                <span className={styles.labelText} style={value === "" ? {} : labelStyle} >{label}</span>
                <input className={styles.inputText} name={"input"} type={type} value={value} onChange={(e) => { onChange(e); setValue(e.target.value) }} />
            </label>
        </div>
        <div className={styles.errorMessagesContainer} >
            <p className={styles.errorMessagesText} > {error.message} </p>
        </div>
    </section>
}