import styles from "./Login.module.css";
import SecondaryButton from "../../../../sharedComponents/secondaryButton/SecondaryButton.component";
import InputText from "../../../../sharedComponents/inputText/InputText.component";
import PrimaryButton from "../../../../sharedComponents/primaryButton/PrimaryButton.component";
import {useState} from "react";
import useLogin from "../../../../_hooks/useLogin";
import {Credential} from "../../../../types/user";


import icon from "../../static/images/app-icon.jpeg"
export default function Login ({show}: {show: (v: boolean) => void}) {

    const [credentials, setCredentials] = useState<Credential>({username:"", password:""})
    const login = useLogin();


    return <section className={styles.wrapper} >
        <div className={styles.container} >
            <div className={styles.loginHeader} >
                <img className={styles.logo} src={icon} alt={"app icon"} />
            </div>
            <div className={styles.loginMain} >
                <div className={styles.inputsContainer} >
                    <InputText placeholder={"alassane"} required={true} label={"Nom d'utilisateur"} type={"text"} onChange={(e) => { setCredentials(c => ({...c, username: e.target.value})) }} />
                    <InputText placeholder={"passer"} required={true} label={"Mot de passe"} type={"password"} onChange={(e) => { setCredentials(c => ({...c, password: e.target.value})) }} />
                </div>
                <div className={styles.actionButtonsContainer} >
                    <PrimaryButton value={"Valider"} action={() => login(credentials)} />
                    <SecondaryButton value={"Annuler"} action={() => show(false)} />
                </div>
            </div>
        </div>
    </section>
}