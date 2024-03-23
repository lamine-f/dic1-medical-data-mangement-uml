import {useConnectionContext} from "./useConnection";
export default function useGenerateName () {
    const connection = useConnectionContext()
    let title = "";
    const name = connection.user.name;
    switch (connection.user.role) {
        case "ASSIST-ADMIN":
            title = "Assistant I";
            break;
        case "ASSIST-MED":
            title = "Assistant";
            break;
        default:
            title = "Docteur";
    }
    return title + " " + name.firstName + " " + name.lastName;
}