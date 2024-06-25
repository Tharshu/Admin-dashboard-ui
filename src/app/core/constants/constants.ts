import { environment } from "../../../environments/environment.dev";

const apiUrl = environment.apiEndpoint;

export const ApiEndpoint = {
    Auth: {
        Register: `${apiUrl}/user/signUp`,
        Login: `${apiUrl}/auth/login`,
        Getallusers: `${apiUrl}/user/all`,
        Refreshtoken: `${apiUrl}/auth/refreshToken`,
        Blockuser: `${apiUrl}/user`
    },
    Meta: {
        Roles: `${apiUrl}/meta/roles`,
    },
    Product: {
        Collection: `${apiUrl}/v1/api/product/collection`,
        Type:`${apiUrl}/v1/api/product/product-type`,
        Prod:`${apiUrl}/v1/api/product`
        // GetAllCollection: `${apiUrl}/v1/api/product/collection`,
        // UpdateCollection: `${apiUrl}/v1/api/product/collection/`,
        // DeleteCollection: `${apiUrl}/v1/api/product/collection/`,
        // GelbyId: `${apiUrl}/v1/api/product/collection/`
    }
};

export const LocalStorage = {
    token: 'USER_TOKEN',
    refreshtoken: 'REFRESH_TOKEN',
};