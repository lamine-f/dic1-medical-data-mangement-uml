import styles from "./SideBar.module.css"
import Buttons from "./Buttons/Buttons";
import Button from "./Button/Button";
import {useState} from "react";
import {useConnectionContext} from "../../../../_hooks/useConnection";
import useGenerateName from "../../../../_hooks/useGenerateName";
export default function SideBar() {

    const name = useGenerateName();

    return <div className={styles.wrapper} >
        <div className={styles.SideBarHeader} >
            <h2>Navigation</h2>
            <span>X</span>
        </div>
        <Buttons >
            <Button isActive={true} route={""} value={"Acceuil"}/>
            <Button route={"patient"} value={"Patient"}/>
            <Button route={"meets"} value={"Rendez vous"}/>
            <Button route={"stats"} value={"Statistiques"}/>
            <Button route={"logout"} value={"Déconnexion"}/>
        </Buttons>
        <div style={{position: "absolute", color: "black", bottom: "10px", left: "10px", fontWeight: "bold"}}  >{name}</div>
    </div>
}