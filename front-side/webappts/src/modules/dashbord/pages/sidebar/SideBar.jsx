import styles from "./SideBar.module.css"
export default function SideBar({children, headerText, footerText, width}) {


    return <div className={styles.wrapper} style={ width ? {width}:{} }  >
        <div className={styles.SideBarHeader} >
            <h2>{headerText}</h2>
            {/*<span>X</span>*/}
        </div>
        {children}
        <div style={{position: "absolute", color: "black", bottom: "10px", left: "10px", fontWeight: "bold"}}  >{footerText}</div>
    </div>
}