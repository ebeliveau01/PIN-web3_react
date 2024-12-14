import Cookies from 'js-cookie';

export function estAuthentifie(): Boolean {
    return typeof getJWT() === 'string';
}

export const setJWT = (id: string, token: string) => {
  Cookies.set('authToken', token, { expires: 7, path: '/', secure: true, sameSite: 'Strict' });
  Cookies.set('uuid', id, { expires: 7, path: '/', secure: true, sameSite: 'Strict' });
};

export const unsetJWT = () => {
    Cookies.remove('authToken', { path: '/' });
    Cookies.remove('uuid', { path: '/' });
};

export const getJWT = (): string | undefined => {
    return Cookies.get('authToken');
};

export const getUuid = (): string | undefined => {
    return Cookies.get('uuid');
}