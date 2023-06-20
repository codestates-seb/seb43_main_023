export default function shareKakao(route: string, title: string) {
	const { Kakao } = window as any;
	// url이 id값에 따라 변경되기 때문에 route를 인자값으로 받아줌
	if (Kakao) {
		if (!Kakao.isInitialized()) {
			Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY); // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
		}

		Kakao.Link.sendDefault({
			objectType: 'feed', // 카카오 링크 공유 여러 type들 중 feed라는 타입 -> 자세한 건 카카오에서 확인
			content: {
				title: '너의 MBTI는', // 인자값으로 받은 title
				description: title, // 인자값으로 받은 title
				imageUrl: 'https://ifh.cc/g/Y8AbbX.png',
				link: {
					mobileWebUrl: route, // 인자값으로 받은 route(uri 형태)
					webUrl: route,
				},
			},
			buttons: [
				{
					title: '보러 가기',
					link: {
						mobileWebUrl: route,
						webUrl: route,
					},
				},
			],
		});
	}
}
