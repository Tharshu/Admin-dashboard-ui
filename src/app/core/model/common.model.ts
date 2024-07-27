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


