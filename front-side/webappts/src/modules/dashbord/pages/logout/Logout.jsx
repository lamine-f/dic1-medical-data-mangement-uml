import styles from "./Logout.module.css"
import PrimaryButton from "../../../../sharedComponents/primaryButton/PrimaryButton.component";
import SecondaryButton from "../../../../sharedComponents/secondaryButton/SecondaryButton.component";
import useLogout from "../../../../_hooks/useLogout";
export default function Logout () {

    const logout = useLogout();

    return <section className={styles.wrapper} >
        Se déconnecter
        <SecondaryButton action={() => logout()} value={"Confirmer"}/>
        <PrimaryButton value={"Annuler"} />
    </section>
}