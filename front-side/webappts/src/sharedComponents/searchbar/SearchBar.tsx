import styles from "./SearchBar.module.css"
import InputText from "../inputText/InputText.component";
import {useState} from "react";

interface SearchBarProps {
    getInput: (v:string) => void,
    placeholder?:string
}
export default function SearchBar({placeholder, getInput}:SearchBarProps) {

    const [value, setValue] = useState<string>("")

    const handleChangeInput = (e:any) => {
        const text = e.target.value
        setValue(text);
        getInput(text);
    }

    return<>
        <div id={styles.search}>
            <svg viewBox="0 0 420 60" xmlns="http://www.w3.org/2000/svg" className={styles.searchSvg}>
                <rect className={styles.bar}/>

                <g className={styles.magnifier}>
                    <circle className={styles.glass}/>
                    <line className={styles.handle} x1="32" y1="32" x2="44" y2="44"></line>
                </g>

                <g className={styles.sparks}>
                    <circle className={styles.spark}/>
                    <circle className={styles.spark}/>
                    <circle className={styles.spark}/>
                </g>

                <g className={`${styles.burst} ${styles.patternOne}`}>
                    <circle className={styles.particleCircle}/>
                    <path className={styles.particleTriangle}/>
                    <circle className={styles.particleCircle}/>
                    <path className={styles.particlePlus}/>
                    <rect className={styles.particleRect}/>
                    <path className={styles.particleTriangle}/>
                </g>
                <g className={`${styles.burst} ${styles.patternTwo}`}>
                    <path className={styles.particlePlus}/>
                    <circle className={styles.particleCircle}/>
                    <path className={styles.particleTriangle}/>
                    <rect className={styles.particleRect}/>
                    <circle className={styles.particleCircle}/>
                    <path className={styles.particlePlus}/>
                </g>
                <g className={`${styles.burst} ${styles.patternThree}`}>
                    <circle className={styles.particleCircle}/>
                    <rect className={styles.particleRect}/>
                    <path className={styles.particlePlus}/>
                    <path className={styles.particleTriangle}/>
                    <rect className={styles.particleRect}/>
                    <path className={styles.particlePlus}/>
                </g>
            </svg>
            <input placeholder={placeholder} onChange={(e) => handleChangeInput(e)} value={value} type="search" name="q" aria-label="Search for inspiration" className={styles.searchInput}/>
        </div>
    </>
}