/* eslint-disable jsx-a11y/label-has-associated-control */
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '../../Global.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FiDelete } from 'react-icons/fi';
import SubjectDropdown from '../../Components/Community/SubjectDropdown';

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	flex-direction: column;
`;

const Body = styled.div`
	width: 950px;

	> h2 {
		padding-bottom: 10px;
	}

	> p {
		color: gray;
		font-size: 13px;
		line-height: 30px;
		padding-bottom: 10px;
	}
`;

const StyledEditor = styled(Editor)`
	font-size: 16px;
`;

const DropDownContainer = styled.div`
	margin: 15px 0;
`;

const TitleInput = styled.input`
	margin-bottom: 15px;
	width: 100%;
	padding: 10px;
	font-size: 13px;
	border: 1px solid rgb(214, 217, 219);
	background-color: #fafafa;
	height: 42px;

	&:focus {
		outline: none !important;
		border-color: rgb(214, 217, 219);
	}
`;
const TagContainer = styled.div`
	margin-top: 15px;
	display: flex;
	align-items: center;
	border: 1px solid rgb(214, 217, 219);
	width: 100%;
	height: 40px;
`;
const Hash = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	padding: 0 10px;
	margin: 10px;
	height: 20px;
	width: auto;
	background-color: #ebebeb;

	> div {
		display: flex;
		justify-content: center;
		align-items: center;
		width: max-content;
	}
`;
const HashName = styled.p`
	width: auto;
	margin-right: 10px;
	font-size: 13px;
`;
const HashBtn = styled.button`
	display: flex;
	align-items: center;
	cursor: pointer;
`;
const InputBox = styled.input`
	width: 100%;
	border: none;
	height: 30px;
	font-size: 13px;
	padding-left: 10px;
	background-color: #f9f9f9;
	&:focus {
		outline: none;
	}
`;

const ImgContainer = styled.div`
	margin-top: 15px;
	width: 100%;

	display: flex;
	justify-content: space-around;

	div {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40px;
		padding-left: 10px;

		> label {
			font-size: 14px;
			color: gray;
			margin-right: 5px;

			&:hover {
				color: #0db4f3;
			}
		}

		input[type='file'] {
			position: absolute;
			width: 0;
			height: 0;
			padding: 0;
			margin: -1px;
			overflow: hidden;
			clip: rect(0, 0, 0, 0);
			border: 0;
		}
	}
`;

const PostBtn = styled.button`
	margin-top: 15px;
	width: 100%;
	background-color: #0db4f3;
	padding: 12px;
	border-radius: 2px;
	color: white;
	font-weight: 600;
	font-size: 15px;
`;

function PostUpload() {
	const editorRef = useRef<Editor | null>(null);

	const imgUploadInput = useRef<HTMLInputElement | null>(null);
	const [tags, setTags] = useState<string[]>([]);
	const [tag, setTag] = useState<string>('');
	const [Images, setImages] = useState<string[]>([]);

	const removeTag = (i: number) => {
		const clonetags = tags.slice();
		clonetags.splice(i, 1);
		setTags(clonetags);
	};
	const addTag = (e: ChangeEvent<HTMLInputElement>) => {
		setTag(e.target.value);
	};
	const handleClick = () => {
		setTags([...tags, tag]);
		setTag('');
	};
	const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleClick();
		}
	};

	const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const newFileURL = URL.createObjectURL(event.target.files[0]);
			setImages((prevImages) => [...prevImages, newFileURL]);
		}
	};

	const handleBtn = () => {
		if (editorRef.current) {
			const instance = editorRef.current.getInstance();
			const content = instance.getMarkdown();

			console.log(content);
			console.log('dsd', Images);
		} else {
			console.log('dd');
		}
	};
	return (
		<div className="main">
			<Container>
				<Body>
					<h2> 글쓰기 </h2>
					<p>
						자유롭게 자신의 경험, 즐거운 이야기들을 나눠보세요 <br /> 단, 다른
						사람에게 불편할 수도 있는 이야기는 지양해주세요 💙
					</p>
					<hr />
					<DropDownContainer>
						<SubjectDropdown />
					</DropDownContainer>
					<TitleInput placeholder="제목을 입력해주세요" />
					<StyledEditor
						ref={editorRef} // ref 연결
						placeholder="내용을 입력해주세요."
						previewStyle="vertical" // 미리보기 스타일 지정
						height="300px" // 에디터 창 높이
						initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
						toolbarItems={[
							// 툴바 옵션 설정
							['heading', 'bold', 'italic', 'strike'],
							['hr', 'quote'],
							['ul', 'ol', 'task', 'indent', 'outdent'],
							['table', 'link'],
							['code', 'codeblock'],
						]}
						plugins={[colorSyntax]}
					/>

					<TagContainer>
						{tags.map((e, i) => (
							// eslint-disable-next-line react/no-array-index-key
							<Hash key={i}>
								<div>
									<HashName>{e}</HashName>
									<HashBtn onClick={() => removeTag(i)}>
										<FiDelete />
									</HashBtn>
								</div>
							</Hash>
						))}

						<InputBox
							placeholder="태그를 입력해주세요"
							onChange={(e) => addTag(e)}
							onKeyPress={(e) => handleKeyPress(e)}
							value={tag}
						/>
					</TagContainer>

					<ImgContainer>
						<div>
							<label htmlFor="img1">
								<div className="btnStart">Image 1 첨부하기</div>
							</label>

							<input
								id="img1"
								type="file"
								accept="image/*"
								ref={imgUploadInput}
								onChange={onImageChange}
							/>
						</div>
						<div>
							<label htmlFor="img1">
								<div className="btnStart">Image 2 첨부하기</div>
							</label>
							<input
								type="file"
								accept="image/*"
								ref={imgUploadInput}
								onChange={onImageChange}
							/>
						</div>
						<div>
							<label htmlFor="img1">
								<div className="btnStart">Image 3 첨부하기</div>
							</label>
							<input
								type="file"
								accept="image/*"
								ref={imgUploadInput}
								onChange={onImageChange}
							/>
						</div>
					</ImgContainer>

					<PostBtn onClick={handleBtn}> 작성하기 </PostBtn>
				</Body>
			</Container>
		</div>
	);
}

export default PostUpload;