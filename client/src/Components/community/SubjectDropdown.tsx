/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useGet from '../../hooks/useGet';

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

const Ul = styled.ul``;

const Li = styled.li`
	width: inherit;
	background-color: #fafafa;
	padding: 12px;

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
	width: 90vw;
	/* width: 89.8vw; */
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

interface Type {
	postId: number;
	subject: string;
}

function SubjectDropdown({ handleSubject, from }: SubjectDropdownProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selected, setSelected] = useState<string>('');

	const { id } = useParams();

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
