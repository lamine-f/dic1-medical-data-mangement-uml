import styles from "./footer.module.css";
export default function Footer () {
    return <footer className={styles.footer}>
        <div className={styles.last}>
            <p className={styles.copyright}>
                © 2024 Conception et Réalisation par
                <a href="#about_me">
                    <span className={styles.name}> TaawBuGoor</span>
                </a>
                <br/> Tous droits réservés
            </p>
        </div>
    </footer>
}