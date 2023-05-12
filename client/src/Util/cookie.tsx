// 어디서든 쓸 수 있는 쿠키를 설정하는 함수
// eslint-disable-next-line import/no-extraneous-dependencies
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: string, option?: object) => {
	return cookies.set(name, value, { ...option });
};

export const getCookie = (name: string) => {
	return cookies.get(name);
};

export const removeCookie = (name: string) => {
	return cookies.remove(name);
};
