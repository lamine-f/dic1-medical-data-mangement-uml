import styles from "./LandingPage.module.css";

import logos_g14 from "./static/images/Logos_g14.png"
import logos_g15 from "./static/images/Logos_g15.png"
import logos_g16 from "./static/images/Logos_g16.png"
import Login from "./components/Login/Login.component";
import {useEffect, useState} from "react";
import PrimaryButton from "../../sharedComponents/primaryButton/PrimaryButton.component";
import toast from "react-hot-toast";
export default function LandingPage () {
    const [login, setLogin] = useState(false)

    useEffect(() => {
        if (login) {
            document.body.style.overflowY = "hidden";
        }else {
            document.body.style.overflowY = "auto";
        }

    }, [login]);

    return <section className={styles.wrapper} >
        { login && <Login show={setLogin} /> }

        <header className={styles.header}>
            <div className={styles.title}>
                <h2>Gestion Médicale</h2>
            </div>
            <nav className={styles.logo}>
                <img src={logos_g15} alt="HALD"/>
                <img src={logos_g16} alt="UMMISCO"/>
                <img src={logos_g14} alt="UCAD"/>
            </nav>
        </header>

        <main className={styles.main} >
            <div className={styles.image}></div>
            <div className={styles.users}>
                <div className={styles.assistant}>
                    <h4>Assistant</h4>
                    <p>Responsable du remplissage du dossier patient sous la supervision du médecin.</p>
                </div>
                <div className={styles.medecin}>
                    <h4>Médecin</h4>
                    <p>Responsable de la prise en charge du patient et guide de l'assistant.</p>
                </div>
                <div className={styles.admin}>
                    <h4>Administrateur</h4>
                    <p>Responsable de la maintenance du système, s'assure de la cohérence des données.</p>
                </div>
            </div>

            <PrimaryButton value={"Se connecter"} action={() => setLogin(true)} />
        </main>

    </section>
}