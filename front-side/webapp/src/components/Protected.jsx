import {useConnectionContext} from "../_hooks/useConnection";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Protected ({children}) {
    const connection = useConnectionContext();
    const navigate = useNavigate();

    useEffect(() => {
        if ( !connection.user.isConnected ) {
            navigate("/", {replace: true})
        }
    }, [connection, navigate]);

    return <>
        {children}
    </>
}