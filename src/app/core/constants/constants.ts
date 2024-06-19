const apiUrl = 'http://localhost:8181/Authentication';

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
    }
};

export const LocalStorage = {
    token: 'USER_TOKEN',
    refreshtoken: 'REFRESH_TOKEN',
};