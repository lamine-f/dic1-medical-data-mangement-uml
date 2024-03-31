import {useConnectionContext} from "../_contexts/useConnection";
import {useLoaderContext} from "../components/loader/useLoader";
import {useNavigate} from "react-router-dom";

export default function useLogout () {
    const connection = useConnectionContext();
    const loader = useLoaderContext();
    const loadTime = 500;
    const navigate = useNavigate();
    return  () =>  {
        connection.unauthenticate();
        loader.setLoading(true);
        setTimeout(() => {
            loader.setLoading(false);
            navigate("/");
        }, loadTime);
    }

}