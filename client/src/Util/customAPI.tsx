// 어디서든 쓸 수 있는 공통 API함수
import axios from 'axios';

// import { refresh, refreshErrorHandle } from './refresh';
// baseURL: `${process.env.REACT_APP_API_URL}`,

const baseURL = 'http://localhost:4000';

// eslint-disable-next-line import/prefer-default-export
export const Api = axios.create({
	baseURL,
	timeout: 10000,
	params: {},
});

Api.interceptors.request.use(
	(config) => {
		return config;
	},
	(err) => {
		return Promise.reject(err);
	},
);
Api.interceptors.response.use(
	(config) => {
		// eslint-disable-next-line no-param-reassign
		config.headers.Authorization = `Bearer ${localStorage.getItem(
			'accessToken',
		)}`;
		return config;
	},
	(err) => {
		return Promise.reject(err);
	},
);

/*
Api.interceptors.request.use(refresh, refreshErrorHandle);
실패하면 header에 accessToken만 넣기
*/
