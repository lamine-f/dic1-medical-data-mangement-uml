import styles from "./footer.module.css";
export default function Footer () {
    return <footer className={styles.footer}>
        <div className={styles.mainFooter}>
            <section className={styles.mainFooterLeft}>
                <p className={styles.textMe}>Ecrivez-nous</p>
                <div className={styles.mail}>
                    <input type="mail" placeholder="Votre adresse mail ici"/>
                </div>
                <div className={styles.textarea}>
                    <textarea name="" id="" cols="30" rows="5" placeholder="Un commentaire ?"></textarea>
                </div>
                <div className={styles.submit}>
                    <input type="submit" value="Envoyer"/>
                </div>
            </section>

            <div className={styles.options}>
                <h5>Aller à</h5>
                <ul>
                    <li><a href="#header">Accueil</a></li>
                    <li><a href="#about_us">A propos de nous !</a></li>
                    <li><a href="#competences">Compétences</a></li>
                    <li><a href="#contact">Contacts</a></li>
                </ul>
            </div>

            <div className={styles.joinMe}>
                <h5>Contacts</h5>
                <div className={styles.contact}>
                    <div className={styles.inline}>
                        <div>
                            <a href="tel:+221333333333">
                                {/*[TODO CHANGE WITH DYNAMIC BOX ICON]*/}
                                <i className="bx bxs-phone"></i>
                            </a>
                            <p>+221333333333</p>
                        </div>
                    </div>

                    <div className={styles.inline}>
                        <div>
                            <a href="mailto:gestion.medicale@gmail.com">
                                <i className="bx bxl-gmail"></i>
                            </a>
                            <p>gestion.medicale@gmail.com</p>
                        </div>
                    </div>

                    <div className={styles.inline}>
                        <div>

                            <a href="#">
                                <i className="bx bx-map"></i>
                            </a>
                            <p>Fann - Dakar - Sénégal</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div className={styles.last}>
            <p className={styles.copyright}>
                © 2024 Conception et Réalisation par
                <a href="#about_me">
                    <span className={styles.name}>TaawBuGoor</span>
                </a>
                <br/> Tous droits réservés
            </p>
        </div>
    </footer>
}