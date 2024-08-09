import { environment } from "../../../environments/environment.dev";

const apiUrl = environment.apiEndpoint;
const version = environment.v1;

export const ApiEndpoint = {
  Auth: {
    Register: `${apiUrl}/api/v1/user/signUp`,
    Login: `${apiUrl}/api/v1/auth/login`,
    Getallusers: `${apiUrl}/api/v1/user/all`,
    Refreshtoken: `${apiUrl}/api/v1/auth/refreshToken`,
    Blockuser: `${apiUrl}/api/v1/user`,
    user: `${apiUrl}/api/v1/user/email`,
  },
  Meta: {
    Roles: `${apiUrl}/api/v1/meta/roles`,
  },
  Product: {
    Collection: `${apiUrl}/api/v1/product/collection`,
    Type: `${apiUrl}/api/v1/product/product-type`,
    Prod: `${apiUrl}/api/v1/product`,
    // GetAllCollection: `${apiUrl}/v1/api/product/collection`,
    // UpdateCollection: `${apiUrl}/v1/api/product/collection/`,
    // DeleteCollection: `${apiUrl}/v1/api/product/collection/`,
    // GelbyId: `${apiUrl}/v1/api/product/collection/`
  },
  Currency: {
    Url: `${apiUrl}/api/v1/currency`,
  },
  Price: {
    Url: `${apiUrl}/api/v1/price`,
  },
  Inventory: {
    Url: `${apiUrl}/api/v1/inventory`,
  },
  Reason: {
    Url: `${apiUrl}/api/v1/reason`,
  },
  Orders: {
    Url: `${apiUrl}/api/v1/order`,
  },
};

export const LocalStorage = {
  token: "USER_TOKEN",
  refreshtoken: "REFRESH_TOKEN",
};
