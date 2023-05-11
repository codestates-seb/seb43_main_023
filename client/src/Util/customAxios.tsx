import axios, { AxiosInstance } from 'axios';

const SERVER_ADDRESS = 'http://localhost:4000';
const customAxios: AxiosInstance = axios.create({
	baseURL: `${SERVER_ADDRESS}`,
	headers: {
		Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
	},
	withCredentials: true,
});
export default customAxios;

/*
import { customAxios } from '../../Util/customAxios';

const requestPost = async (postDto) => {
  const res = await customAxios.post('/write-post', postDto);
}
 */
