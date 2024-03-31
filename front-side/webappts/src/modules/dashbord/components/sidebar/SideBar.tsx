import styles from "./SideBar.module.css"

import icon from "./static/image/app-icon.jpeg"
import {ReactNode} from "react";
export default function SideBar({children, headerText, footerText, width}: {children: ReactNode, headerText: string, footerText: string, width?: string}) {

    return <div className={styles.wrapper} style={ width ? {width}:{} }  >
        <div className={styles.SideBarHeader} >
            <span className={styles.logoContainer} >
                <img  className={styles.logo} src={icon}   alt={"icon"}/>
            </span>
            <h2>{headerText}</h2>
            {/*<span>X</span>*/}
        </div>
        {children}
        <div style={{position: "absolute", color: "black", bottom: "10px", left: "10px", fontWeight: "bold"}}  >{footerText}</div>
    </div>
}