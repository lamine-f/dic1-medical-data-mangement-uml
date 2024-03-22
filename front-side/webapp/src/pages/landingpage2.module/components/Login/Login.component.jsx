import styles from "./Login.module.css";
import SecondaryButton from "../../../../_shared_components/SecondaryButton/SecondaryButton.component";
import InputText from "../../../../_shared_components/InputText/InputText.component";
import PrimaryButton from "../../../../_shared_components/PrimaryButton/PrimaryButton.component";
import {useState} from "react";
import useLogin from "../../../../_hooks/useLogin";


export default function Login ({show}) {

    const [credentials, setCredentials] = useState({username:"", password:""})
    const login = useLogin();

    return <section className={styles.wrapper} >
        <div className={styles.container} >
            <div className={styles.loginHeader} >
            </div>
            <div className={styles.loginMain} >
                <div className={styles.inputsContainer} >
                    <InputText required={true} label={"Nom d'utilisateur"} type={"text"} onChange={(e) => { setCredentials(c => ({...c, username: e.target.value})) }} />
                    <InputText required={true} label={"Mot de passe"} type={"password"} onChange={(e) => { setCredentials(c => ({...c, password: e.target.value})) }} />
                </div>
                <div className={styles.actionButtonsContainer} >
                    <PrimaryButton value={"Valider"} action={() => login(credentials)} />
                    <SecondaryButton value={"Annuler"} action={() => show(false)} />
                </div>
            </div>
        </div>
    </section>
}