import {useConnectionContext} from "../_contexts/useConnection";
import {Role, UserName} from "../types/user";
import {useEffect, useState} from "react";

export default function useGenerateName () {
    const connection = useConnectionContext();
    const [name, setName] = useState<UserName>();
    const [title, setTitle] = useState<string>("");


    useEffect(() => {
        setName(prevState => connection.user?.name)
    }, [connection]);

    useEffect(() => {
        switch (connection.user?.role) {
            case Role.ASSIST_ADMIN:
                setTitle(prevState => "Assistant I")
                break;
            case Role.ASSIST_MED:
                setTitle(prevState => "Assistant")
                break;
            default:
                setTitle(prevState => "Docteur")
        }
    }, [connection]);

    return title + " " +name?.firstName + " " + name?.lastName;
}