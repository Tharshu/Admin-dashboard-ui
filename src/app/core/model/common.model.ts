export interface User{
    id: number;
    username: String;
    email: string;
    password: string;
}

export interface Role{
    id: number;
    name: string;
}

export interface LoginPayload {
    username: string;
    password: string;
}

export interface RegisterPayload {
    userName: string;
    email: string;
    password: string;
    role: Role;
}

export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
}

export interface LoginResponse {
    accessToken : string;
    refreshToken: string;
}