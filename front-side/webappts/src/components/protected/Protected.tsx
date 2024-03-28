import {useConnectionContext} from "../../_contexts/useConnection";
import {useNavigate} from "react-router-dom";
import {PropsWithChildren, useEffect} from "react";

export default function Protected ({children}: PropsWithChildren) {
    const connection = useConnectionContext();
    const navigate = useNavigate();

    useEffect(() => {
        if ( connection?.user )
        if ( !connection?.user.isConnected ) {
            navigate("/", {replace: true})
        }
    }, [connection, navigate]);

    return <>
        {children}
    </>
}