import {useEffect, useState} from "react";

export interface RequestConfig {
    axiosInstance: any;
    method: string;
    url: string;
    requestConfig?: any[];
}

const useApiFunction = () => {

    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [controller, setController] = useState<AbortController>();



    const axiosFetch = async (configObj: RequestConfig ) : Promise<any> => {
        setLoading(true);
        const ctrl = new AbortController();
        setController(ctrl);
        const {
            axiosInstance,
            method,
            url,
            requestConfig = []
        } = configObj;

        await  axiosInstance[method.toLowerCase()](url,
            ...requestConfig
        ).then((res: any) => {
            setResponse(res.data);
        }).catch((err: any) => {
            setError(err?.response?.data || "Error Server");
        }).finally (() => {
            setLoading(false);
        })
    }

    useEffect(() => {
        if (controller)
            return () => controller.abort()
    }, [controller])

    return [response, error, loading, axiosFetch];

}

export default useApiFunction;