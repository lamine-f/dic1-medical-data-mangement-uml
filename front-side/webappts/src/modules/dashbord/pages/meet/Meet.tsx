import styles from "./Meet.module.css";
import SideBar from "../sidebar/SideBar";
import Buttons from "../sidebar/buttons/Buttons";
import Button from "../sidebar/button/Button";
import {Outlet} from "react-router-dom";
import Calendar from "../../../../sharedComponents/calendar/Calendar";

export default function Meet () {
    return <section className={styles.wrapper}>
        <Calendar/>
    </section>
}