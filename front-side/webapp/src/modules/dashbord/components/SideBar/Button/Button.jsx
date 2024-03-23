import styles from "./Button.module.css"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
export default function Button ({value, action, isActive, route}) {
    const [active, setActive] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setActive(isActive)
    }, [isActive]);



    return <div className={ active ? styles.wrapperActive : styles.wrapperInactive} onClick={() => {
        action();
        navigate(route)
    }} >
        <span className={styles.buttonText} >{value}</span>
    </div>
}