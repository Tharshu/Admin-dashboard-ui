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

type ProductStatus = 'draft' | 'proposed' | 'published' | 'rejected';

export interface Product {
showDropdown: any;
    id: string;
    title: string;
    subtitle: string;
    description: string;
    handle: string;
    isGiftcard: boolean;
    status: ProductStatus;
    thumbnail: string;
    collectionId: ProductCollection;
    typeId: ProductType;
    discountable: boolean;
    externalId: string;
    profileId: string;
    weight: number;  // Using number for BigDecimal
    length: number;  // Assuming similar types for other dimensions
    height: number;
    width: number;
    hsCode: string;
    originCountry: string;
    midCode: string;
    material: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Sort {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
}

export interface PageResponse<T> {
    content: T[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}

