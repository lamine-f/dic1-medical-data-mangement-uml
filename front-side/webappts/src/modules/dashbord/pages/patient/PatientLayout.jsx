import styles from  "./PatientLayout.module.css"
import {Outlet} from "react-router-dom";
import SideBar from "../sidebar/SideBar";
import Buttons from "../sidebar/buttons/Buttons";
import Button from "../sidebar/button/Button";
import {MedicalFileStoreProvider} from "../../../../_store/medicalFile.store";

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
            <>

                <Outlet></Outlet>
            </>
        </main>
    </section>
}