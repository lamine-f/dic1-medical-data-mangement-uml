import styles from "./SearchBar.module.css"
import InputText from "../InputText/InputText.component";

interface SearchBarProps {
    getInput: (v:string) => void
}
export default function SearchBar({getInput}:SearchBarProps) {

    return <InputText label={"Chercher"} onChange={(e) => getInput(e.target.value)} type={"text"} required={false}/>
}