import styles from "./DashbordLayout.module.css";
import {Outlet, useNavigate} from "react-router-dom";
import SideBar from "./pages/sidebar/SideBar";
import Button from "./pages/sidebar/button/Button";
import Buttons from "./pages/sidebar/buttons/Buttons";
import useGenerateName from "../../_hooks/useGenerateName";
import React, {useState} from "react";
import InputText from "../../sharedComponents/inputText/InputText.component";
import Form from "./components/form/Form";
import PrimaryButton from "../../sharedComponents/primaryButton/PrimaryButton.component";
import useLogout from "../../_hooks/useLogout";
import  {FontawesomeObject} from "@fortawesome/fontawesome-svg-core";
import {faArrowLeft, faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
export default function DashbordLayout () {
    const name = useGenerateName();
    const logout = useLogout();
    const navigate = useNavigate();
    const [disconnect, setDisconnect ] = useState(false)
    return <section className={styles.wrapper} >
        <SideBar
            headerText={"Navigation"}
            footerText={name}
            width={""}
        >
            <Buttons >
                <Button isActive={true} route={""} value={"Accueil"}/>
                <Button route={"patient"} value={"Patient"}/>
                <Button route={"medicalfile"} value={"Dossier médic"}/>
                <Button route={"meets"} value={"Rendez vous"}/>
                <Button route={"stats"} value={"Statistiques"}/>
            </Buttons>
        </SideBar>
        <main className={styles.main}>
            <div className={styles.back} > <span onClick={() => {navigate(-1)}} > <FontAwesomeIcon icon={faArrowLeft} /> </span> </div>
            <div className={styles.disconnectIcon} > <span onClick={() => {setDisconnect(true)}} >  <FontAwesomeIcon  icon={faArrowRightFromBracket} /> </span> </div>
            <Outlet></Outlet>

        </main>
        <Form
            title={"Etes vous sur de vouloir vous déconnecter ?"}
            validAction={() => {logout()}}
            show={disconnect}
            setShow={setDisconnect}
            inputsText={<>
            </>}
        />
    </section>
}

