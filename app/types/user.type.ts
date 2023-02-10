export interface IcreateUser {
    username: string,
    email?: string
    isAdmin?: boolean;
}

export interface IupdateUser {
    username: string;
    email?: string;
    isAdmin?: boolean;
}