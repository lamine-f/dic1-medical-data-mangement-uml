import styles from "./SelectInput.module.css";
import {ReactNode, useRef, useState} from "react";

interface SelectInputProps {
    label: string,
    options: ReactNode[],
    getSelected: (v:any) => any
}
export default function SelectInput ({options, label, getSelected}: SelectInputProps ) {

    return <div>
        <label> {label} </label>
        <select className={styles.select} onChange={(e) => {getSelected(e.target.value)}} >
            {options}
        </select>
    </div>
}


interface OptionsProps {
    label: string,
    value: any

}
export function Options ({label, value}:OptionsProps) {
    return <option value={value} >{label}</option>
}