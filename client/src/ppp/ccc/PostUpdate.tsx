import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '../../Global.css';

import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

import { FiAlertCircle, FiDelete } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

/* eslint-disable jsx-a11y/label-has-associated-control */
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { Editor } from '@toast-ui/react-editor';

import SearchPlace from '../../Components/ccc/SearchPlace';
import SubjectDropdown from '../../Components/ccc/SubjectDropdown';
import useAxios from '../../hooks/useAxios';
import { Iuser } from '../../rrr/userInfoReducer';
import { RootState } from '../../sss/store';
import { Api } from '../../uuu/customAPI';

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

// const ImgContainer = styled.div`
// 	background-color: #ababab8b;
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
	background-color: #ababab8b;
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
		color: gray;
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

interface Post {
	content: string;
	createdAt: string;
	postId: number;
	image: string[];
	modifiedAt: string;
	nickName: string;
	subject: string;
	tag: string[];
	title: string;
}

interface Type {
	tag: [];
	subject: string;
	title: string;
}

function PostUpdate() {
	const navigate = useNavigate();

	const userInfos = useSelector((state: RootState) => state.user) as Iuser;

	const editorRef = useRef<Editor | null>(null);
	const { id } = useParams();

	const postData = useAxios({
		method: 'get',
		url: `/posts/${id}`,
	});

	let axiosData: Type;
	let titleData;

	if (postData.response) {
		axiosData = postData.response;
		titleData = axiosData.title;
	}

	const [tags, setTags] = useState<string[]>([]);
	const [tag, setTag] = useState<string>('');
	const [post, setPost] = useState<Post>();
	const [subject, setSubject] = useState<string>('');
	const [title, setTitle] = useState<string | undefined>(titleData);
	const [alert, setAlert] = useState<boolean>(false);
	const [x, setX] = useState<string>('');
	const [y, setY] = useState<string>('');

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

	const handleImg = () => {
		setAlert(true);
	};

	const handleSubject = (sub: string) => {
		setSubject(sub);
	};

	const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const handlePlace = (data: any) => {
		setX(data[0].x);
		setY(data[0].y);
	};

	const handleBtn = () => {
		if (editorRef.current) {
			const instance = editorRef.current.getInstance();
			const content = instance.getMarkdown();

			// json-server용 api 요청
			try {
				Api.patch(`/posts/${id}/${userInfos.id}`, {
					title,
					content,
					tag: tags,
				}) // eslint-disable-next-line no-return-assign
					.then(() => {
						if (post?.subject === '여행리뷰') {
							document.location.href = `/tripreview/${id}`;
						} else {
							document.location.href = `/community/${id}`;
						}
					});
			} catch (error) {
				navigate('/error');
			}
		}
	};

	useEffect(() => {
		if (postData.response) {
			const data: Type = postData.response;
			setPost(postData.response);
			setTags(data.tag);
			setSubject(data.subject);
		}
	}, [postData.response]);

	return (
		<div className="main">
			{post && (
				<Container>
					<Body>
						<h2> 글쓰기 </h2>
						<p>
							자유롭게 자신의 경험, 즐거운 이야기들을 나눠보세요 <br />
							<b>말머리와 사진은 수정이 불가능</b>하니 잘 선택해주세요 😊
						</p>
						<hr />
						<DropDownContainer>
							<SubjectDropdown handleSubject={handleSubject} from="Update" />
						</DropDownContainer>
						<TitleInput
							placeholder="제목을 입력해주세요"
							onChange={handleTitle}
							defaultValue={post.title}
							value={post.title}
						/>

						{subject === '여행리뷰' ? (
							<SearchPlace handlePlace={handlePlace} />
						) : null}

						<StyledEditor
							initialValue={post.content}
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
							{tags &&
								tags.map((e, i) => (
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

						<ImgContainer onClick={handleImg}>
							{/* <div>
								<label htmlFor="img1">
									<div className="btnStart">Image 1 첨부하기</div>
								</label>
							</div>
							<div>
								<label htmlFor="img1">
									<div className="btnStart">Image 2 첨부하기</div>
								</label>
							</div>
							<div>
								<label htmlFor="img1">
									<div className="btnStart">Image 3 첨부하기</div>
								</label>
							</div> */}

							<div>Image 1 링크</div>

							<div>Image 2 링크</div>

							<div>Image 3 링크</div>
						</ImgContainer>
						{alert ? (
							<Alert>
								<p>
									<FiAlertCircle />
								</p>
								사진은 수정 불가능해요
							</Alert>
						) : null}

						<PostBtn onClick={handleBtn}> 작성하기 </PostBtn>
					</Body>
				</Container>
			)}
		</div>
	);
}

export default PostUpdate;
