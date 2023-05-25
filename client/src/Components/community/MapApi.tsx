import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import useGet from '../../hooks/useGet';

declare global {
	interface Window {
		kakao: any;
	}
}

interface Type {
	locationX: string;
	locationY: string;
}

function MapContainer() {
	const { id } = useParams();

	const postData = useGet(`/${id}`);

	useEffect(() => {
		if (postData) {
			const data: Type = postData;
			const markerPosition = new window.kakao!.maps.LatLng(
				Number(data.locationY),
				Number(data.locationX),
			);

			const marker = {
				position: markerPosition,
			};

			const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
			const options = {
				// 지도를 생성할 때 필요한 기본 옵션
				center: new window.kakao.maps.LatLng(
					Number(data.locationY),
					Number(data.locationX),
				), // 지도의 중심좌표.
				level: 3, // 지도의 레벨(확대, 축소 정도)
				marker,
			};

			// const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
			const staticMap = new window.kakao.maps.StaticMap(container, options);
		}
	}, [postData]);

	return <div id="map" style={{ width: 'inherit', height: '20vh' }} />;
}

export default MapContainer;
