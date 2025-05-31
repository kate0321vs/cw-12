export interface RegisterMutation {
    email: string;
    password: string;
    displayName: string;
}

export interface IUser {
    _id: string;
    email: string;
    password: string;
    token: string;
    role: string;
    googleId?: string,
    displayName: string;
}

export interface RegisterResponse {
    user: IUser;
    message: string;
}

export interface LoginMutation {
    email: string;
    password: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    };
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}

export interface IActivity {
    _id: string;
    user: { _id: string; displayName: string; };
    title: string;
    description: string;
    image: string;
    isPublished: boolean;
}

export interface IActivityMutation {
    title: string;
    description: string;
    image: File;
}