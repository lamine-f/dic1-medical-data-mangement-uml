import styles from "./MedicalFile.module.css";
import MedicalFileCard from "./components/MedicalFileCard/MedicalFileCard";
import useApi from "../../../../../../_hooks/useApi";
import {useEffect, useState} from "react";
import {backend} from "../../../../../../_api/instances";
import {useLoaderContext} from "../../../../../../components/Loader/useLoader";

export default function MedicalFile () {
    const loader = useLoaderContext();
    const [response, error, loading, fetch] = useApi();
    const [medicalFiles, setMedicalFiles] = useState([])

    useEffect(() => {
        fetch({url: "medicalFiles", method: "GET", axiosInstance:backend})
    }, []);

    useEffect(() => {
        if (response?.data){
            setMedicalFiles( [...response?.data] )
        }
    }, [response]);

    useEffect(() => {
        loader.setLoading(loading)
    }, [loading])


    return <section className={styles.wrapper} >
        <div className={styles.medicalFilesContainer} >
            {medicalFiles.map((mediaFile, id) => <MedicalFileCard key={id} modifDate={mediaFile.modificationDate} />)}
        </div>
    </section>
}