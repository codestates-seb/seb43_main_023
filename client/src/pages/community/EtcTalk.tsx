import '../../Global.css';

import { useEffect, useState } from 'react';

import { AiFillHeart } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

import { FiChevronRight } from 'react-icons/fi';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import AWS from 'aws-sdk';
import Pagination from '../../Components/community/Pagination';
import SideBar from '../../Components/community/SideBar';
import Tags from '../../Components/community/Tags';
import { Ipost } from '../../type/Ipost';

import * as style from '../../Components/community/CommunityStyle';
import { RootState } from '../../store/Store';
import { Ilogin } from '../../type/Ilogin';
import useGet from '../../hooks/useGet';

import HamburgerMenu from '../../Components/community/HamburgerMenu';
import ToastAlert from '../../utils/ToastAlert';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
// eslint-disable-next-line import/order
import { Viewer } from '@toast-ui/react-editor';

function EtcTalk() {
	const [posts, setPosts] = useState<Ipost[]>([]);
	const [curPage, setCurPage] = useState<number>(1);
	const [imageDataBucket, setImageDataBucket] = useState<string[]>([]);
	const bucketName = 'imageupload-practice';

	AWS.config.update({
		region: process.env.REACT_APP_REGION,
		accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
		secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY_ID,
	});

	const navigate = useNavigate();
	const login = useSelector((state: RootState) => state.login) as Ilogin;

	const handleBtn = () => {
		if (login.isLogin) {
			navigate('/community/create');
		} else {
			ToastAlert('로그인 상태가 아닙니다');
		}
	};

	const response = useGet('?size=100&subject=잡담&page=1');

	const startIdx = (curPage - 1) * 8;
	const endIdx = startIdx + 8;

	useEffect(() => {
		if (response) {
			setPosts(response);
		}
	}, [response]);

	useEffect(() => {
		const s3 = new AWS.S3();
		if (posts && posts.length > 0) {
			const getImagesFromBucket = async (image: string | undefined) => {
				console.log('aa', image);
				const imageKeys = posts.filter((el) => el.image.length > 0);

				console.log(imageKeys);

				try {
					const urls = await Promise.all(
						imageKeys.map((key) => {
							const params = { Bucket: bucketName, Key: image };
							return s3.getSignedUrlPromise('getObject', params);
						}),
					);
					setImageDataBucket(urls);
				} catch (error) {
					/* empty */
				}
			};

			// eslint-disable-next-line consistent-return
			const checkImagesFromBucket = async () => {
				// eslint-disable-next-line no-restricted-syntax
				for (const post of posts) {
					// eslint-disable-next-line no-restricted-syntax
					for (const image of post.image) {
						try {
							const params = { Bucket: bucketName, Key: image };
							// eslint-disable-next-line no-await-in-loop
							await s3.headObject(params).promise();
							getImagesFromBucket(image);
							return true;
						} catch (error: any) {
							if (error.code === 'NotFound') {
								return false;
							}
						}
					}
				}
			};

			checkImagesFromBucket();
		}
	}, [posts]);

	return (
		<div className="main">
			<style.Explain>
				<div>
					<h1>잡담</h1>
					<div>
						<p>
							여행과 MBTI 관련 외 여러 대화를 나누고 싶다면 ? <br />
							이 공간에서 여러 사람들과 자유롭게 대화를 나눠보세요
							<br />
							타인에게 예민하거나 안전하지 않은 내용은 지양해주세요
						</p>
						<button onClick={handleBtn}>
							<span>
								작성하러 가기{' '}
								<p className="arrow">
									<FiChevronRight />
								</p>
							</span>
						</button>
						<HamburgerMenu />
					</div>
				</div>
			</style.Explain>
			<style.Container>
				<SideBar />
				<div>
					<style.Body>
						{posts &&
							posts.slice(startIdx, endIdx).map((el) => (
								<Link to={`/community/${el.postId}`}>
									<style.Contentbody>
										<div>
											<style.Header>
												<div>
													<h3>{`[${el.subject}]`}</h3>
													<h3>{el.title}</h3>
												</div>

												{el.content?.length > 70 ? (
													<style.ViewerContainer>
														<Viewer
															initialValue={`${el.content
																?.substring(0, 175)
																.substring(0, el.content!.lastIndexOf(' '))
																.trim()}...`}
														/>
													</style.ViewerContainer>
												) : (
													<style.ViewerContainer>
														<Viewer initialValue={el.content} />
													</style.ViewerContainer>
												)}
											</style.Header>
											<style.Info img={el.member.img || ''}>
												<div className="img" />
												<div>{el.member.nickname}</div>
												<div>{el.postCreatedAt.slice(0, 10)}</div>
												<div>조회 {el.viewCount}</div>
												<div>
													<AiFillHeart color="#fe6464" />
													<p> {el.voteCount}</p>
												</div>
											</style.Info>
										</div>

										{el.image[0] &&
											(imageDataBucket.length > 0 ? (
												<img
													src={imageDataBucket[0]}
													alt="게시글 사진 미리보기"
												/>
											) : (
												<img src={el.image[0]} alt="게시글 사진 미리보기" />
											))}
									</style.Contentbody>
								</Link>
							))}
					</style.Body>
					<style.PaginationContainer>
						{posts.length > 0 ? (
							<Pagination
								curPage={curPage}
								setCurPage={setCurPage}
								totalPage={Math.ceil(posts.length / 8)}
								pageCount={5}
							/>
						) : null}
					</style.PaginationContainer>
				</div>
				<style.TagContainer>
					<Tags />
				</style.TagContainer>
			</style.Container>
		</div>
	);
}

export default EtcTalk;
