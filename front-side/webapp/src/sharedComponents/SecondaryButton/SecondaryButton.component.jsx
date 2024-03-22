import styles from "./SecondaryButton.module.css";

export default function SecondaryButton ({action, value}) {
    return <div className={styles.buttonContainer} >
        <div className={styles.button} onClick={() => action()} >{value}</div>
    </div>
}