/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import useGet from '../../hooks/useGet';

const Button = styled.button`
	width: 100%;
	display: flex;
	height: 40px;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
	border-radius: 5px;
	background: white;
	border: 1px solid rgba(0, 0, 0, 0.2);
	&::placeholder {
		color: rgba(0, 0, 0, 0.3);
	}
	> div {
		color: rgba(0, 0, 0, 0.3);
	}
`;

const Ul = styled.ul`
	background: white;
	width: 298px;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
`;

const Li = styled.li`
	width: inherit;
	padding: 8px;
	font-size: 11px;
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
	width: 300px;
	border: 1px solid rgb(214, 217, 219);
	border-top: none;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
`;

interface SubjectDropdownProps {
	handleSubject: (selectedOption: string) => void;
	from: string;
}

interface Type {
	postId: number;
	subject: string;
}

function MBTIDropdown({ handleSubject, from }: SubjectDropdownProps) {
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

	const menus = [
		'ISTP',
		'ISFP',
		'ESTP',
		'ESFP',
		'INFJ',
		'INFP',
		'ENFJ',
		'ENFP',
		'ISTJ',
		'ISFJ',
		'ESTJ',
		'ESFJ',
		'INTJ',
		'INTP',
		'ENTJ',
		'ENTP',
	];

	const postData = useGet(``);

	useEffect(() => {
		if (from === 'Update' && postData) {
			const filtered: Type[] = postData;
			const filteredData = filtered.filter((el) => el.postId === Number(id));
			setSelected(filteredData[0].subject);
		}
	}, [from, id, postData]);

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			<Button type="button" onClick={handleDropDown}>
				<div>{selected || 'MBTI 선택'}</div>
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

export default MBTIDropdown;
