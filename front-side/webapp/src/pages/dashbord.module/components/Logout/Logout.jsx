import styles from "./Logout.module.css"
import PrimaryButton from "../../../../_shared_components/PrimaryButton/PrimaryButton.component";
import SecondaryButton from "../../../../_shared_components/SecondaryButton/SecondaryButton.component";
import useLogout from "../../../../_hooks/useLogout";
export default function Logout () {

    const logout = useLogout();

    return <section className={styles.wrapper} >
        Se déconnecter
        <SecondaryButton action={() => logout()} value={"Confirmer"}/>
        <PrimaryButton value={"Annuler"} />
    </section>
}