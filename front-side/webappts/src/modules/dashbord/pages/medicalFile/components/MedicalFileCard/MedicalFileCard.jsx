import styles from "./MedicalFileCard.module.css";

const name = {
    firstName: "",
    lastName: ""
}
export default function MedicalFileCard ({modifDate}) {
    const modificationDate = new Date(Date.parse(modifDate));
    const time = {
        date: `${modificationDate.toLocaleDateString()}`,
        time: `${modificationDate.getHours()}:${modificationDate.getMinutes()}:${modificationDate.getSeconds()}`
    }

    return <div className={styles.wrapper} >
        <div className={styles.container} >
            <div className={styles.nameContainer} >Nom patient: <span className={styles.nameText} >{name.firstName} {name.lastName}</span> </div>
            <div className={styles.sep} />
            <div className={styles.modificationDate} >Modification: {time.date} à {time.time}</div>
        </div>
    </div>
}