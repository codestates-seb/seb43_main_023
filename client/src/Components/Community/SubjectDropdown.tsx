/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';

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

const Alert = styled.div`
	margin-left: 5px;
	color: #f37676;
	font-size: 12px;
	margin-top: 5px;
	display: flex;

	> p {
		font-size: 15px;
		margin-right: 5px;
	}
`;

interface SubjectDropdownProps {
	handleSubject: (selectedOption: string) => void;
	from: string;
}

function SubjectDropdown({ handleSubject, from }: SubjectDropdownProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selected, setSelected] = useState<string>('');
	const [alert, setAlert] = useState<boolean>(false);

	const { id } = useParams();

	const handleDropDown = () => {
		if (from === 'Update') {
			setAlert(true);
		} else {
			setIsOpen(!isOpen);
		}
	};

	const handleSelected = (event: React.MouseEvent<HTMLButtonElement>) => {
		const selectedOption = event.currentTarget.innerText;
		handleSubject(selectedOption);
		setSelected(selectedOption);
		setIsOpen(false);
	};

	const menus = ['여행리뷰', '여행고민', '같이가요', 'MBTI', '잡담'];

	useEffect(() => {
		if (from === 'Update') {
			axios
				.get(`http://localhost:4000/posts/${id}`)
				.then((res) => setSelected(res.data.subject));
		}
	}, [from, id]);

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{from === 'Update' ? (
				<>
					<Button type="button" onClick={handleDropDown}>
						<div>{selected || '말머리 선택'}</div>
						<div>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
					</Button>
					{alert ? (
						<Alert>
							<p>
								<FiAlertCircle />
							</p>
							말머리는 수정 불가능해요
						</Alert>
					) : null}
				</>
			) : (
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
			)}
		</>
	);
}

export default SubjectDropdown;