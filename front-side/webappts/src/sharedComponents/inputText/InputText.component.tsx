import styles from "./InputText.module.css"
import {useEffect, useState} from "react";


const labelStyle = {
    top: "-5px",
    left: "0",
    fontSize: "small",
    padding: "0 10px"
}

interface InputTextProps {
    label: string,
    placeholder?:string,
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void ,
    width?: string,
    height?: string,
    type: string,
    required: boolean,
    passedValue?: string
}
export default function InputText ({passedValue, label, placeholder, onChange, width, height, type, required} : InputTextProps) {
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

    useEffect(() => {
        if (passedValue)
            setValue(passedValue);
    }, [passedValue]);



    return <section className={styles.wrapper} >
        <div className={styles.inputContainer} style={{width, height}} >
            <label htmlFor={"input"} className={styles.label} >
                <span className={styles.labelText} style={value === "" ? {} : labelStyle} >{label}</span>
                <input className={styles.inputText} name={"input"} type={type} value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { onChange(e); setValue(e.target.value) }} />
            </label>
        </div>
        <div className={styles.errorMessagesContainer} >
            <p className={styles.errorMessagesText} > {error.message} </p>
        </div>
    </section>
}