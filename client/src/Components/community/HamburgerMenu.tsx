import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HamburgerMenuContainer = styled.div`
	margin-right: 20px;
	@media (max-width: 580px) {
		display: block; /* 햄버거 메뉴 보이게 설정 */
	}

	@media (min-width: 581px) {
		display: none; /* 햄버거 메뉴 숨김 설정 */
	}
`;

const HamburgerIcon = styled.div``;

const MenuItems = styled.ul`
	height: 100%;
	width: 70%;
	position: fixed;
	top: 0;
	right: 0;
	padding-top: 60px;
	background-color: #fafafa;
	transition: 0.3s;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 20px;
	justify-content: space-around;
`;

const MenuItem = styled.li`
	width: 100%;
	padding: 10px;
	display: flex;
	justify-content: center;

	&:hover {
		background-color: #e1e1e1;
		color: #0db4f3;
	}

	&::after {
		background-color: #0db4f3;
		color: #0db4f3;
	}
	a {
		color: inherit;
		text-decoration: none;
	}
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5); /* 검은색 배경 투명도 조절 */
	z-index: 201;
`;

function HamburgerMenu() {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};
	return (
		<HamburgerMenuContainer>
			<HamburgerIcon onClick={handleToggle}>
				<GiHamburgerMenu />
			</HamburgerIcon>
			{isOpen && (
				<Overlay onClick={handleToggle}>
					<MenuItems>
						<MenuItem>
							<Link to="/tripreview">여행리뷰 </Link>
						</MenuItem>
						<MenuItem>
							<Link to="/community">여행고민 </Link>
						</MenuItem>
						<MenuItem>
							<Link to="/tripmate">같이가요 </Link>
						</MenuItem>
						<MenuItem>
							<Link to="/mbti">MBTI </Link>
						</MenuItem>
						<MenuItem>
							<Link to="/etctalk">잡담</Link>
						</MenuItem>
					</MenuItems>
				</Overlay>
			)}
		</HamburgerMenuContainer>
	);
}

export default HamburgerMenu;
