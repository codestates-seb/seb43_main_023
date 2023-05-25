import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '../../Global.css';

import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

import { FiAlertCircle, FiDelete } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Editor } from '@toast-ui/react-editor';

import { Api } from '../../apis/customAPI';
import SearchPlace from '../../Components/community/SearchPlace';
import SubjectDropdown from '../../Components/community/SubjectDropdown';
import { UPDATE } from '../../reducers/userInfoReducer';
import { RootState } from '../../store/Store';
import { Ipost } from '../../type/Ipost';
import { Iuser } from '../../type/Iuser';
import { SweetAlert2 } from '../../utils/SweetAlert';
import useGet from '../../hooks/useGet';

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
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		color: gray;
		font-size: 13px;
		line-height: 30px;
		padding-bottom: 10px;

		> a {
			text-decoration: none;
			color: #0db4f3;

			&:hover {
				color: #00688e;
			}
		}
	}
`;

const StyledEditorContainer = styled.div`
	margin-top: 15px;
	padding: 0;
`;

const StyledEditor = styled(Editor)`
	margin-top: 15px;
	padding: 0;
`;

const DropDownContainer = styled.div`
	margin-top: 15px;
`;

const TitleInput = styled.input`
	margin-top: 15px;
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

// const ImgContainer = styled.div`
// 	margin-top: 15px;
// 	width: 100%;

// 	display: flex;
// 	justify-content: space-around;

// 	div {
// 		display: flex;
// 		justify-content: center;
// 		align-items: center;
// 		height: 40px;
// 		padding-left: 10px;

// 		> label {
// 			font-size: 14px;
// 			color: gray;
// 			margin-right: 5px;

// 			&:hover {
// 				color: #0db4f3;
// 			}
// 		}

// 		input[type='file'] {
// 			position: absolute;
// 			width: 0;
// 			height: 0;
// 			padding: 0;
// 			margin: -1px;
// 			overflow: hidden;
// 			clip: rect(0, 0, 0, 0);
// 			border: 0;
// 		}
// 	}
// `;

const ImgContainer = styled.div`
	margin-top: 15px;
	width: 100%;
	display: flex;
	justify-content: space-between;

	div {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40px;

		input {
			width: 300px;
			padding: 10px;
			font-size: 13px;
			border: 1px solid rgb(214, 217, 219);
			background-color: #fafafa;
			height: 42px;

			&:focus {
				outline: none !important;
				border-color: rgb(214, 217, 219);
			}
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

function PostUpload() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const editorRef = useRef<Editor | null>(null);

	const instance = editorRef.current?.getInstance();
	const content = instance?.getMarkdown();

	const imgUploadInput = useRef<HTMLInputElement | null>(null);
	const [tags, setTags] = useState<string[]>([]);
	const [tag, setTag] = useState<string>('');
	const [Images, setImages] = useState<string[]>([]);
	const [posts, setPosts] = useState<Ipost[]>([]);
	const [subject, setSubject] = useState<string>('');
	const [title, setTitle] = useState<string>('');
	const [alert, setAlert] = useState<boolean>(false);
	const [x, setX] = useState<string>('');
	const [y, setY] = useState<string>('');
	const [placeName, setPlaceName] = useState<string>('');

	const userInfos = useSelector((state: RootState) => state.user) as Iuser;

	const postData = useGet(``);

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

	// 이미지 파일 첨부 코드 ( 사용 여부 보류 )
	// const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	if (event.target.files) {
	// 		const newFileURL = URL.createObjectURL(event.target.files[0]);
	// 		setImages((prevImages) => [...prevImages, newFileURL]);
	// 	}
	// };

	const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value) {
			const newImage = event.target.value;
			setImages((prevImages) => [...prevImages, newImage]);
		}
	};

	const handleSubject = (sub: string) => {
		setSubject(sub);
	};

	const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const handlePlace = (data: any, selected: string) => {
		const selectedData = data.filter(
			(el: { place_name: string }) => el.place_name === selected,
		);

		console.log(selected);
		setPlaceName(selectedData[0].place_name);

		setX(data[0].x);
		setY(data[0].y);
	};

	const handleBtn = () => {
		if (
			(subject === '여행리뷰' && tags.length === 0) ||
			(subject === '여행리뷰' && Images.length === 0)
		) {
			setAlert(true);
		}

		if (
			subject === '여행리뷰' &&
			tags.length > 0 &&
			Images.length > 0 &&
			editorRef.current
		) {
			try {
				Api.post(`/posts/${userInfos.id}`, {
					subject,
					title,
					content,
					tag: tags,
					image: Images,
					locationX: x,
					locationY: y,
					placeName,
				});
				const myposts = posts.filter(
					(post) => post.member.email === userInfos.email,
				);
				if (myposts.length === 4) {
					Api.patch(`/members/${userInfos.id}`, {
						nickname: userInfos.nickname,
						mbti: userInfos.mbti,
						img: userInfos.img,
						badge: '초보여행자',
					});
					dispatch(
						UPDATE({
							nickname: userInfos.nickname,
							mbti: userInfos.mbti,
							img: userInfos.img,
							badge: '초보여행자',
						}),
					);
					SweetAlert2('초보여행자 뱃지 획득!', '').then((result) => {
						if (result.value) {
							document.location.href = `/tripreview/${
								posts[0].postId + 1 || '1'
							}`;
						}
					});
				} else {
					document.location.href = `/tripreview/${posts[0].postId + 1 || '1'}`;
				}
			} catch (error) {
				navigate('/error');
			}
		} else if (subject !== '여행리뷰' && editorRef.current) {
			try {
				Api.post(`/posts/${userInfos.id}`, {
					subject,
					title,
					content,
					tag: tags,
					image: Images,
				});

				document.location.href = `/community/${posts[0].postId + 1 || '1'}`;
			} catch (error) {
				navigate('/error');
			}
		}
	};

	useEffect(() => {
		if (postData) {
			setPosts(postData);
		}
	}, [postData]);

	return (
		<div className="main">
			<Container>
				<Body>
					<h2> 글쓰기 </h2>
					<p>
						<div>
							자유롭게 자신의 경험, 즐거운 이야기들을 나눠보세요 <br /> 단, 다른
							사람에게 불편할 수도 있는 이야기는 지양해주세요 💙
						</div>
						<a href="https://ifh.cc/" target="_blank" rel="noreferrer">
							이미지 파일 링크로 변환하기
						</a>
					</p>
					<hr />
					<DropDownContainer>
						<SubjectDropdown handleSubject={handleSubject} from="upload" />
					</DropDownContainer>
					<TitleInput
						placeholder="제목을 입력해주세요"
						onChange={handleTitle}
					/>
					{subject === '여행리뷰' ? (
						<SearchPlace handlePlace={handlePlace} />
					) : null}

					<StyledEditorContainer>
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
					</StyledEditorContainer>

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

					{alert && tags.length === 0 ? (
						<Alert>
							<p>
								<FiAlertCircle />
							</p>
							태그는 필수 사항이예요
						</Alert>
					) : null}

					<ImgContainer>
						{/* 이미지 파일 첨부 코드 (사용 여부 보류) */}
						{/* <div>
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
						</div> */}
						<div>
							<input
								type="text"
								placeholder="Image 1 링크"
								onChange={onImageChange}
							/>
						</div>

						<div>
							<input
								type="text"
								placeholder="Image 2 링크"
								onChange={onImageChange}
							/>
						</div>

						<div>
							<input
								type="text"
								placeholder="Image 3 링크"
								onChange={onImageChange}
							/>
						</div>
					</ImgContainer>

					{alert && Images.length === 0 ? (
						<Alert>
							<p>
								<FiAlertCircle />
							</p>
							사진은 필수 사항이예요
						</Alert>
					) : null}

					<PostBtn onClick={handleBtn}> 작성하기 </PostBtn>
				</Body>
			</Container>
		</div>
	);
}

export default PostUpload;
