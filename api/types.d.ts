export interface IUser {
    email: string;
    password: string;
    token: string;
    role: string;
    googleId?: string,
    displayName: string;
}