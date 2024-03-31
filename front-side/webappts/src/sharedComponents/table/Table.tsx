import styles from "./Table.module.css";
import React, {PropsWithChildren, ReactNode} from "react";
import PrimaryButton from "../primaryButton/PrimaryButton.component";

export function HRow ({children}: PropsWithChildren) {
    return <div className={`${styles.row} ${styles.header}`}>
        {children}
    </div>
}

export function Row ({children, actionButton}: { children: ReactNode, actionButton: ReactNode }) {
    return <div className={styles.row} >
        {children}
        <div>
            {actionButton}
        </div>
    </div>
}

export function Cell ({value} : {value: string} ) {
    return <div className={styles.cell}>{value}</div>
}

export function Table ({name, row, hrow, hrowButtonActions}:{name: string,  row: ReactNode[], hrow: ReactNode, hrowButtonActions: ReactNode}) {
    return <div className={styles.details}>
        <div className={styles.header}>
            <h2>{name}</h2>
            {hrowButtonActions}
        </div>

        <div className={styles.people}>
            {hrow}
            {row}
        </div>
    </div>
}

export function RowClickButton ({value, action}: {value: string, action: () => void}) {
    return <div className={styles.rowClickButton}  onClick={() => action()}>
        {value}
    </div>
}


export function HRowClickButton ({value, action}: {value: string, action: () => void}) {
    return <div className={styles.hRowClickButton} onClick={() => action()}>
        {value}
    </div>
}