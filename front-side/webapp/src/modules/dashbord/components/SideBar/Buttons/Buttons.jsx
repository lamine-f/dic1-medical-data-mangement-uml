import styles from "./Buttons.module.css"
import React, {cloneElement, useEffect, useState} from "react";
export default function Buttons ({children}) {

    const [actives, setActives] = useState([]);

    useEffect(() => {
        setActives( children.map(node => node.props.isActive || false ) )
    }, [children]);

    const genActive = (length, id) => {
        return Array.from({length}, (v, k) => false).map( (_, index) => index === id );
    }

    return <div className={styles.wrapper}>
        {children.map( (node, id) => cloneElement(node, {...node.props, key: id , isActive: actives[id], action: () => {setActives( genActive(children.length, id) )} }, {...node?.children}))}
    </div>
}