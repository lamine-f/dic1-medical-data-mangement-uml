import {useConnectionContext} from "../_contexts/useConnection";
import {useLoaderContext} from "../components/loader/useLoader";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {useEffect} from "react";
import {Credential} from "../types/user";

export default function useLogin () {
    const connection = useConnectionContext();
    const loader = useLoaderContext();
    const loadTime = 1000;
    const navigate = useNavigate();
    useEffect(() => {
        if (connection.user?.isConnected)
            navigate("dashboard")
    }, [connection]);
    return (credentials: Credential) =>  {
        const isAuthenticated = connection.authenticate(credentials);
        loader.setLoading(true);
        if ( isAuthenticated  ) {
            // setTimeout(() => {
            //     toast.success("Valide", {
            //         position: "top-center"
            //     });
            //     navigate("dashboard");
            // }, loadTime);
            loader.setLoading(false);
        }else {
            setTimeout(() => {
                loader.setLoading(false);
                toast.error("Veuillez réessayer", {
                    position: "top-center"
                });
            }, loadTime);
        }
    }

}