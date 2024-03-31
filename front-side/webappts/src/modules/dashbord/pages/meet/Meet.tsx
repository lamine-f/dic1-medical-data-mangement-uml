import styles from "./Meet.module.css";
import SideBar from "../../components/sidebar/SideBar";
import Buttons from "../../components/sidebar/buttons/Buttons";
import Button from "../../components/sidebar/button/Button";
import {Outlet} from "react-router-dom";
import Calendar from "../../../../sharedComponents/calendar/Calendar";

export default function Meet () {
    return <section className={styles.wrapper}>
        <Calendar/>
    </section>
}