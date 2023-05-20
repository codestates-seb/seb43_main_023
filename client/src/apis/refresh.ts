// post, update요청을 보내다가 accesstoken이 만료될 시 refreshtoken을 가지고 accesstoken을 발급해주는 함수
import { InternalAxiosRequestConfig } from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import Swal from 'sweetalert2';

import { getCookie, removeCookie } from '../utils/cookie';
import { getLocalStorage, setLocalStorage } from '../utils/LocalStorage';
import { Api } from './customAPI';

const refresh = async (
	config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
	const refreshToken = getCookie('refreshToken');
	const expiresAtAccess = getLocalStorage('expiresAtAccess');

	// 토큰이 만료되었고, refreshToken 이 저장되어 있을 때
	//  or if (error.response.status === 401)
	if (moment(Number(expiresAtAccess)).diff(moment()) < 0 && refreshToken) {
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
	config.headers.Authorization = `Bearer ${getLocalStorage('accessToken')}`;
	return config;
};

const refreshErrorHandle = () => {
	removeCookie('refreshToken');
	return Swal.fire({
		icon: 'warning',
		title: '토큰만료',
		text: '다시 로그인 하셔야 합니다.',
		showCancelButton: true,
		confirmButtonText: '로그인',
		cancelButtonText: '취소',
	}).then(async (res) => {
		if (res.isConfirmed) {
			window.location.assign('/login');
		} else {
			window.location.assign('/error');
		}
	});
};

export { refresh, refreshErrorHandle };
