import {Role, User, Credential} from "./types/user"

interface BdUser {
    user: User,
    credentials: Credential
}

export  const users: BdUser[] = [
    {
        user: {
            id: 1,
            isConnected: false,
            name: {
                firstName: "Mouhamed Lamine",
                lastName: "Faye"
            },
            role: Role.MED,
        },
        credentials: {
            username: "lord",
            password: "passer"
        },
    },
    {
        user: {
            id: 4,
            isConnected: false,
            name: {
                firstName: "Alassane",
                lastName: "Ba"
            },
            role: Role.MED,
        },
        credentials: {
            username: "alassane",
            password: "passer"
        },
    },
    {
        user: {
            id: 2,
            isConnected: false,
            name: {
                firstName: "Rawane",
                lastName: "Diouf"
            },
            role: Role.ASSIST_MED,
        },
        credentials: {
            username: "rawane",
            password: "passer"
        },
    },
    {
        user: {
            id: 3,
            isConnected: false,
            name: {
                firstName: "Elhadji",
                lastName: "Cissé"
            },
            role: Role.ASSIST_ADMIN,
        },
        credentials: {
            username: "elhadji",
            password: "passer"
        },
    },

]