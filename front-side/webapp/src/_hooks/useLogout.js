import {useConnectionContext} from "./useConnection";
import {useLoaderContext} from "../components/Loader/useLoader";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {useEffect} from "react";

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
            navigate("");
        }, loadTime);
    }

}