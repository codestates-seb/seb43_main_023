import useAxios from './useAxios';

// get 요청 hook
export default function useGet(params?: string) {
	const { response } = useAxios({
		method: 'get',
		url: `/posts${params}`,
	});
	return response;
}
