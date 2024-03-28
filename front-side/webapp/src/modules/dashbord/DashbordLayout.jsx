import styles from "./DashbordLayout.module.css";
import {Outlet} from "react-router-dom";
import SideBar from "./components/SideBar/SideBar";
import Button from "./components/SideBar/Button/Button";
import Buttons from "./components/SideBar/Buttons/Buttons";
import useGenerateName from "../../_hooks/useGenerateName";
export default function DashbordLayout () {
    const name = useGenerateName();

    return <section className={styles.wrapper} >
        <SideBar
            headerText={"Navigation"}
            footerText={name}
        >
            <Buttons >
                <Button isActive={true} route={""} value={"Accueil"}/>
                <Button route={"patient/medicalfile"} value={"Patient"}/>
                <Button route={"meets"} value={"Rendez vous"}/>
                <Button route={"forms"} value={"Formulaire"}/>
                <Button route={"stats"} value={"Statistiques"}/>
                <Button route={"logout"} value={"Déconnexion"}/>
            </Buttons>
        </SideBar>
        <main className={styles.main}>
            <Outlet></Outlet>
        </main>
    </section>
}