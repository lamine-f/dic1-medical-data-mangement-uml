import styles from "./MeetLayout.module.css";
import SideBar from "../SideBar/SideBar";
import Buttons from "../SideBar/Buttons/Buttons";
import Button from "../SideBar/Button/Button";
import {Outlet} from "react-router-dom";

export default function MeetLayout () {
    return <section className={styles.wrapper}>
        <SideBar
            headerText={"Rendez vous"}
            width={"250px"}
        >
            {/*<Buttons >*/}
            {/*    <Button isActive={true} route={""} value={"Consulter"}/>*/}
            {/*    <Button route={""} value={"Ajouter"}/>*/}
            {/*</Buttons>*/}
        </SideBar>
        <main className={styles.main}>
            <Outlet></Outlet>
        </main>
    </section>
}