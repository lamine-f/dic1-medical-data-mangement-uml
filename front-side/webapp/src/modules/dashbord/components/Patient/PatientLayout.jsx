import styles from  "./PatientLayout.module.css"
import {Outlet} from "react-router-dom";

export default function PatientLayout () {
    return <section className={styles.wrapper}>
        <Outlet></Outlet>
    </section>
}