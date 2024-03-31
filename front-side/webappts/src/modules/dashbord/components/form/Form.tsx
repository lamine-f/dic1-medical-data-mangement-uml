import styles from "./Form.module.css";
import SecondaryButton from "../../../../sharedComponents/secondaryButton/SecondaryButton.component";
import PrimaryButton from "../../../../sharedComponents/primaryButton/PrimaryButton.component";
import {ReactNode, useEffect, useState} from "react";


export default function Form ({title, show, setShow,  inputsText, validAction}: {title?: string, validAction: () => void, show: boolean, inputsText: ReactNode, setShow: (v:boolean) => void}) {

    const [showForm, setShowForm] = useState<boolean>(false);
    useEffect(() => {
        setShowForm(show)
    }, [show]);

    return !showForm ? <></> :
        <section className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.Header} >
                    {title}
                </div>
                <div className={styles.loginMain}>
                    <div className={styles.inputsContainer}>
                        {inputsText}
                    </div>
                    <div className={styles.actionButtonsContainer}>
                        <PrimaryButton value={"Valider"} action={() => {
                            validAction()
                            setShow(false)
                        }}/>
                        <SecondaryButton value={"Annuler"} action={() => setShow(false)}/>
                    </div>
                </div>
            </div>
        </section>

}