import {useConnectionContext} from "./useConnection";
import {useLoaderContext} from "../components/Loader/useLoader";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {useEffect} from "react";

export default function useLogin () {

    const connection = useConnectionContext();
    const loader = useLoaderContext();
    const loadTime = 1000;
    const navigate = useNavigate();

    useEffect(() => {
        if (connection.user.isConnected) {
            navigate("dashboard")
        }
    }, [connection]);

    return function (credentials)  {
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