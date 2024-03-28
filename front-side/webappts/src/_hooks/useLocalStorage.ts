import {Role, User, UserName} from "../types/user";

const key = 'saved-token';
interface Token {
    id:number,
    role:Role,
    name: UserName,
    isConnected: boolean
}

export default  class useLocalStorage {

    private isTokenSet: boolean | null = null;

    constructor() {
        this.verifyIfTokenSet();
    }

    verifyIfTokenSet () {
        if (this.isTokenSet === null) {
            const token = window.localStorage.getItem(key);
            this.isTokenSet = token !== null;
        }
        return this.isTokenSet;
    }
     getTokenFromLocalStorage  ()  {
        if ( !this.verifyIfTokenSet() )
            throw new Error("Token is undefined")
        const token = window.localStorage.getItem(key) as string;
        return JSON.parse(token) satisfies User;
    }
     saveTokenToLocalStorage  (token:Token)  {
        window.localStorage.setItem(key, JSON.stringify(token))
    }

     removeTokenFromLocalStorage  ()  {
        window.localStorage.removeItem(key);
    }
}
