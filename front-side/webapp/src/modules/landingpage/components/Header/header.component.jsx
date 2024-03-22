import styles from "./header.module.css"

import logos_g14 from "../../../landingpage2/static/images/Logos_g14.png";
import logos_g15 from "../../../landingpage2/static/images/Logos_g15.png";
import logos_g16 from "../../../landingpage2/static/images/Logos_g16.png";
import {Link} from "react-router-dom";
export default function HeaderComponent () {
    return <header className={styles.header} >
        <div className={styles.logo}>
            <img src={logos_g14} alt="HALD"/>
            <img src={logos_g15} alt="UMMISCO"/>
            <img src={logos_g16} alt="UCAD"/>
        </div>
        <nav className={styles.navbar}>
            <Link to={""} className={styles.active} >Accueil</Link>
            <Link to="#about_us">A propos de nous !</Link>
            <Link to="#competences">Compétences</Link>
            <Link to="#contact">Contacts</Link>
            <Link to="connexion.html" className={styles.connect}>Connexion</Link>
        </nav>
        <i className={'bx bx-menu-alt-right menu'}></i>
    </header>
}