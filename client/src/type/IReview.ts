export interface IReview {
	postId: number;
	member: any;
	subject: string;
	title: string;
	content: string;
	tag?: null | string;
	image: string[];
	voteCount: number;
	viewCount: number;
	createdAt: string;
	modifiedAt: string;
}
