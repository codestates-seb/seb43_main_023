/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styled from 'styled-components';
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const Button = styled.button`
	border: 1px solid rgb(214, 217, 219);
	width: 100%;
	display: flex;
	height: 40px;
	align-items: center;
	justify-content: space-between;
	padding: 0 10px;

	> div {
		color: gray;
	}
`;

const Ul = styled.ul`
	padding: 5px 0;
`;

const Li = styled.li`
	width: inherit;
	background-color: #fafafa;
	padding: 10px;

	> button {
		width: 100%;
		display: flex;

		&:hover {
			color: #0db4f3;
		}
	}
`;

const Container = styled.div`
	position: absolute;
	z-index: 100;
	width: 950px;
	border: 1px solid rgb(214, 217, 219);
	border-top: none;
`;

interface SubjectDropdownProps {
	handleSubject: (selectedOption: string) => void;
}

function SubjectDropdown({ handleSubject }: SubjectDropdownProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selected, setSelected] = useState<string>('');

	const handleDropDown = () => {
		setIsOpen(!isOpen);
	};

	const handleSelected = (event: React.MouseEvent<HTMLButtonElement>) => {
		const selectedOption = event.currentTarget.innerText;
		handleSubject(selectedOption);
		setSelected(selectedOption);
		setIsOpen(false);
	};

	const menus = ['여행리뷰', '여행고민', '같이가요', 'MBTI', '잡담'];

	return (
		<>
			<Button type="button" onClick={handleDropDown}>
				<div>{selected || '말머리 선택'}</div>
				<div>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
			</Button>
			{isOpen ? (
				<Container>
					<Ul>
						{menus.map((el) => (
							<Li>
								<button type="button" onClick={(e) => handleSelected(e)}>
									{el}
								</button>
							</Li>
						))}
					</Ul>
				</Container>
			) : null}
		</>
	);
}

export default SubjectDropdown;
