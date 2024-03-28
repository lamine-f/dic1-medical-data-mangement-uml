import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react';
import useLocalStorage from "../_hooks/useLocalStorage";
import {users} from "../bd";
import {Credential, User} from "../types/user";

const isMatch = (credentials1: Credential, credentials2: Credential ) => {
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


export interface ConnectionContextValue {
    user: User | undefined,
    authenticate: (credentials: Credential) => boolean,
    unauthenticate: () => void
}

const ConnectionContext = createContext<ConnectionContextValue | undefined>(undefined);
const storage = new useLocalStorage();

export const ConnectionProvider = ({ children } : PropsWithChildren) => {
    const [user, setUser] = useState<User | undefined>();

    useEffect(() => {
        if ( storage.verifyIfTokenSet() ) {
            const token = storage.getTokenFromLocalStorage();
            setUser({...token})
        }

    }, []);
    const authenticate = (credentials: Credential):boolean => {
        const arr= users.filter((user, _) => isMatch(user.credentials, credentials).passwordsMatch );
        const isAuth = arr.length === 1;

        if (!isAuth) {
            console.error("credentials not valide");
            return false;
        }
        const user: User = arr[0].user;
        const newAuthenticate: User = {role: user.role , id: user.id, name: user.name, isConnected: true };
        storage.saveTokenToLocalStorage(newAuthenticate);
        setUser(() => ({...newAuthenticate}));
        return true;
    }
    const unauthenticate = (): void => {
        setUser(undefined);
        storage.removeTokenFromLocalStorage();
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