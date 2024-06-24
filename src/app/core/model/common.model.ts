export interface User{
    userId: number;
    userName: String;
    email: string;
    password: string;
    isBlocked: boolean;
    role: Role;
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

export interface ApiListResponse<T> {
    status: string;
    message?: string;
    data: T[];
}

export interface ApiResponse<T> {
    status: string;
    message?: string;
    data: T;
}

export interface LoginResponse {
    accessToken : string;
    refreshToken: string;
}

export interface RefreshtokenReqest {
    refreshToken: string;
}

export interface ProductCollection {
    id: string;
    title: string;
    handle:string;
    createdAt:string;
    updatedAt:string;
    deletedAt?: string | null; // Optional and can be null
    metadata?: Record<string, any> | null; 
    isActive: boolean;
}

export interface ProductType {
    id: string;
    value: string;
}
