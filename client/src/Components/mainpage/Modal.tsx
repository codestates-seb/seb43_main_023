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
	width: 15%;
	padding: 10px;
	border-radius: 15px;
	@media (max-width: 768px) {
		width: 20%;
	}
	@media (max-width: 425px) {
		width: 35%;
	}
	@media (max-width: 335px) {
		width: 40%;
	}
`;

const ModalView = styled.div`
	position: absolute;
	top: 30vh;
	left: 15vw;
	width: 70%;
	height: 40%;
	overflow-y: scroll;
	background-color: rgba(250, 250, 250, 1);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	border-radius: 15px;
	padding: 20px 30px 30px 30px;
	line-height: 1.5;
	font-size: 1.3em;
	@media (max-width: 425px) {
		width: 80%;
		left: 10vw;
	}
	.explanation {
		@font-face {
			font-family: 'omyu_pretty';
			src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2')
				format('woff2');
			font-weight: normal;
			font-style: normal;
		}
		font-family: 'omyu_pretty';
	}
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
						<span className="explanation">{text}</span>
						<ModalButton onClick={modalHandler}>🛩️ 닫기</ModalButton>
					</ModalView>
				</ModalBackdrop>
			) : null}
		</ModalContainer>
	);
}

export default Modal;
