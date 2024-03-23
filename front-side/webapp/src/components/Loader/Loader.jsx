import styles from "./Loader.module.css"
import {DNA} from "react-loader-spinner";
import {useState} from "react";

export default function Loader ({load}) {
    return <div className={styles.wrapper} >
        <DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
        />
    </div>
}