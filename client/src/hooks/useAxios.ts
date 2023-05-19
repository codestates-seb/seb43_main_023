import { useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type AxiosProps = {
	method: 'get';
	url: string;
};

const useAxios = ({ url, method }: AxiosProps) => {
	const [response, setResponse] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		axios[method](
			`http://ec2-52-79-98-94.ap-northeast-2.compute.amazonaws.com:8080${url}`,
		)
			.then((res) => {
				setResponse(res.data);
			})
			.catch((error) => {
				console.log(`error: ${url}`);
				console.log(error);
				navigate('/error');
			});
	}, [method, navigate, url]);

	return { response };
};

export default useAxios;
