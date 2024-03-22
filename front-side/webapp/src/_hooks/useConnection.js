import React, {createContext, useContext, useEffect, useState} from 'react';
import {getTokenFromLocalStorage, removeTokenFromLocalStorage, saveTokenToLocalStorage} from "./useLocalStorage";
import {users} from "../bd";

const isMatch = (credentials1,credentials2 ) => {
    if ( credentials1.username !== credentials2.username )
        return {
            userNamesMatch: false,
            passwordsMatch: false
        }
    if ( credentials1.password !== credentials2.password )
        return {
            userNamesMatch: true,
            passwordsMatch: false
        }
    return {
        userNamesMatch: true,
        passwordsMatch: true
    }
}

const ConnectionContext = createContext({user:{role:"", name: {}, id:0, isConnected: false}, authenticate: () => {} , unauthenticate:() => {}}, );
export const ConnectionProvider = ({ children }) => {
    const [user, setUser] = useState({role:"", name: {}, id:0, isConnected: false});
    useEffect(() => {
        const token = getTokenFromLocalStorage();
        setUser({...token})
    }, []);
    const authenticate = (credentials) => {
        const arr = users.filter((user, _) => isMatch(user.credentials, credentials).passwordsMatch );
        const isAuth = arr.length === 1;

        if (!isAuth) {
            console.error("credentials not valide");
            return false;
        }
        const user = arr[0];
        const newAuthenticate = {role: user.role, id: user.id, name: user.name, isConnected: true };
        saveTokenToLocalStorage(newAuthenticate);
        setUser(prevState => ({...newAuthenticate}));
        return true;
    }
    const unauthenticate = () => {
        setUser({role:"", name: {}, id:0, isConnected: false});
        removeTokenFromLocalStorage();
    }
    return (
        <ConnectionContext.Provider value={ {user, authenticate, unauthenticate} }>
            {children}
        </ConnectionContext.Provider>
    );
};
export const useConnectionContext = () => {
    const context = useContext(ConnectionContext);
    if (!context) throw new Error('useConnection must be used within a DisplayContext');
    return context;
};