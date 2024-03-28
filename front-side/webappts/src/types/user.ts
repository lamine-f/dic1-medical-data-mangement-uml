export interface Credential {
    username: string,
    password: string
}

export interface UserName {
    firstName: string,
    lastName: string
}

export enum Role {
    MED, ASSIST_MED, ASSIST_ADMIN
}
export interface User {
    id:number,
    role:Role,
    name: UserName,
    isConnected: boolean
}