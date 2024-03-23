import styles from  "./PatientLayout.module.css"
import {Outlet} from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import Buttons from "../SideBar/Buttons/Buttons";
import Button from "../SideBar/Button/Button";

export default function PatientLayout () {
    return <section className={styles.wrapper}>
        <SideBar
            headerText={"Patient"}
            width={"200px"}
        >
            <Buttons >
                <Button isActive={true} route={"medicalfile"} value={"Dossier Médical"}/>
                <Button route={"management"} value={"Gestion"}/>
            </Buttons>
        </SideBar>
        <main className={styles.main}>
            <Outlet></Outlet>
        </main>
    </section>
}