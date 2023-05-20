// post, update요청을 보내다가 accesstoken이 만료될 시 refreshtoken을 가지고 accesstoken을 발급해주는 함수
import { AxiosError, InternalAxiosRequestConfig } from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';

import { getCookie, removeCookie } from '../utils/cookie';
import { getLocalStorage, setLocalStorage } from '../utils/LocalStorage';
import { Api } from './customAPI';

const refresh = async (
	config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
	const refreshToken = getCookie('refreshToken');
	const expiresAtAccess = getLocalStorage('expiresAtAccess');
	const expiresAtRefresh = getLocalStorage('expiresAtRefresh');
	const accessToken = getLocalStorage('accessToken');

	// refreshToken, accessToken 모두 만료되었을 때
	if (moment(Number(expiresAtRefresh)).diff(moment()) < 0) {
		window.localStorage.clear();
		window.location.href = '/login';
	}
	// 토큰이 만료되었고, refreshToken 이 저장되어 있을 때
	//  or if (error.response.status === 401)
	else if (moment(Number(expiresAtAccess)).diff(moment()) < 0 && refreshToken) {
		// 토큰 갱신 서버통신
		const refreshData = await Api.post('/members/reissue', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${refreshToken}`,
			},
			withCredentials: true,
		});

		setLocalStorage('accessToken', refreshData.data.accessToken);
		setLocalStorage('expiresAtAccess', refreshData.data.empiresAtAccess);
		setLocalStorage('empiresAtRefresh', refreshData.data.empiresAtRefresh);
	}
	// eslint-disable-next-line no-param-reassign
	config.headers.Authorization = `Bearer ${accessToken}`;
	return config;
};
/*
//useLocalStorage로 localstorage 사용하려면 쓸 코드(현재 위의 코드에서 쓰기에 hook규칙에 어긋나서 사용못함)
const refresh = async (
	config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
	

	// 엑세스 토큰 만료되면 새로운 토큰 발급
	if (error.response.status === 401) {
		// 토큰 갱신 서버통신
		const refreshData = await Api.post('/members/reissue', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${refreshToken}`,
			},
			withCredentials: true,
		});

		setLocalStorage('accessToken', refreshData.data.accessToken);
		setLocalStorage(
			'expiresAtAccess',
			refreshData.data.empiresAtAccess);
		setLocalStorage(
			'empiresAtRefresh',
			refreshData.data.empiresAtRefresh);
	}
	// eslint-disable-next-line no-param-reassign
	config.headers.Authorization = `Bearer ${accessToken}`;
	return config;
};
*/

const refreshErrorHandle = (err: AxiosError) => {
	removeCookie('refreshToken');
	return Promise.reject(err);
};

export { refresh, refreshErrorHandle };
