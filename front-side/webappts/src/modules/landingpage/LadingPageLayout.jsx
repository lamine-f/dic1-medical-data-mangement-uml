import {Outlet} from "react-router-dom";

import styles from "./LadingPageLayout.module.css"
import HeaderComponent from "./components/header/header.component";
import Footer from "./components/Footer/footer.component";
export default function LadingPageLayout () {
    return <div className={styles.wrapper} >

        <HeaderComponent/>
        <Outlet></Outlet>
        <Footer/>

    </div>
}