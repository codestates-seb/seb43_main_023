import '../../Global.css';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { Api } from '../../apis/customAPI';
import { LOGOUT } from '../../reducers/loginReducer';
import { DELETE } from '../../reducers/userInfoReducer';
import { RootState } from '../../store/Store';
import { Iuser } from '../../type/Iuser';
import { removeCookie } from '../../utils/cookie';
import { removeLocalStorage } from '../../utils/LocalStorage';

const Main = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	padding: 20px 50px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	@media (max-width: 430px) {
		flex-direction: column;
		justify-content: baseline;
		align-items: flex-start;
	}
	.intro {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		.mypage {
			font-size: 30px;
			font-weight: bold;
			margin-bottom: 20px;
		}
		.description {
			font-size: 12px;
			color: rgba(0, 0, 0, 0.5);
		}
	}
	.memberDelete {
		width: 100px;
		font-size: 12px;
		color: rgba(0, 0, 0, 0.2);
		font-weight: bold;
		&:hover {
			cursor: pointer;
			color: rgba(0, 0, 0, 0.5);
		}
		@media (max-width: 430px) {
			width: auto;
			margin-top: 10px;
		}
	}
`;

function IntroBox() {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const userInfos = useSelector((state: RootState) => state.user) as Iuser;

	// 회원 탈퇴 핸들러
	const memberDeleteClick = () => {
		Swal.fire({
			icon: 'warning',
			title: '삭제',
			text: `[${userInfos.nickname}]님 회원 탈퇴하시겠습니까?`,
			showCancelButton: true,
			confirmButtonText: '삭제',
			cancelButtonText: '취소',
		}).then(async (res) => {
			if (res.isConfirmed) {
				try {
					await Api.delete(`/members/${userInfos.id}`);
					removeLocalStorage('accessToken');
					removeLocalStorage('empiresAtAccess');
					removeLocalStorage('empiresAtRefresh');
					removeCookie('refreshToken');
					dispatch(DELETE());
					dispatch(LOGOUT());
					navigate('/main');
				} catch (error) {
					navigate('/error');
				}
			} else {
				navigate('/mypage');
			}
		});
	};
	return (
		<Main>
			<div className="intro">
				<div className="mypage">마이페이지</div>
				<div className="description">
					MBTI와 닉네임은 수정이 가능해요.
					<br />
					MBTI 검사를 원하시면 하단의 링크로 들어가주세요!
					<br />
					내가 쓴 글에서 커뮤니티에 작성한 글들을 볼 수 있어요.
					<br />
					뱃지는 작성한 여행리뷰의 수와 추천수에 따라 초보여행자, 중급여행자,
					고급여행자로 나눠집니다.
				</div>
			</div>
			<button onClick={memberDeleteClick} className="memberDelete">
				회원 탈퇴하기
			</button>
		</Main>
	);
}

export default IntroBox;