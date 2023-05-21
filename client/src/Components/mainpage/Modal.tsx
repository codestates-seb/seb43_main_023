import styled from 'styled-components';

const ModalContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`;

const ModalBackdrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.6);
`;

const ModalButton = styled.button`
	background-color: #0db4f3;
	color: white;
	margin-top: 10px;
	width: 60px;
	border-radius: 15px;
`;

const ModalView = styled.div`
	position: absolute;
	top: 30vh;
	left: 15vw;
	width: 70%;
	background-color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 15px;
	padding: 20px;
`;

type ModalProps = {
	text: string;
	isOpen: boolean;
	setIsOpen: any;
};

function Modal({ text, isOpen, setIsOpen }: ModalProps) {
	if (isOpen) {
		document.body.style.overflow = 'hidden';
	}
	const modalHandler = () => {
		setIsOpen(false);
		document.body.style.overflow = 'unset';
	};

	return (
		<ModalContainer>
			{isOpen ? (
				<ModalBackdrop onClick={modalHandler}>
					<ModalView
						onClick={(event) => {
							event.stopPropagation();
						}}
					>
						{text}
						<ModalButton onClick={modalHandler}>🛩️닫기</ModalButton>
					</ModalView>
				</ModalBackdrop>
			) : null}
		</ModalContainer>
	);
}

export default Modal;
