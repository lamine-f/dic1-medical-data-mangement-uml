import styles from "./Button.module.css"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

interface ButtonProps {
    value: string,
    action?: () => void,
    isActive?: boolean,
    route: string
}
export default function Button ({value, action, isActive, route}:ButtonProps) {
    const [active, setActive] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setActive(!!isActive)
    }, [isActive]);


    return <div className={ active ? styles.wrapperActive : styles.wrapperInactive} onClick={(e) => {
                action && action()
                navigate(route);
            // action()
            }}>
            <span className={styles.buttonText} >{value}</span>
        </div>
}