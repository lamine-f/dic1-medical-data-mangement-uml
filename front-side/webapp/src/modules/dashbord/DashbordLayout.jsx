import styles from "./DashbordLayout.module.css";
import 'react-toastify/dist/ReactToastify.css';

import {Outlet} from "react-router-dom";
import SideBar from "./components/SideBar/SideBar";

export default function DashbordLayout () {
    return <section className={styles.wrapper} >
        <SideBar/>
        <main className={styles.main}>
            <Outlet></Outlet>
        </main>
    </section>
}