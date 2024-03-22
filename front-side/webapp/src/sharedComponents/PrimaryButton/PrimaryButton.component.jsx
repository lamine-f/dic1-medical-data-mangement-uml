import styles from "./PrimaryButton.module.css";

export default function PrimaryButton ({action, value}) {
    return <div className={styles.buttonContainer} >
        <div className={styles.button} onClick={() => action()} >{value}</div>
    </div>
}