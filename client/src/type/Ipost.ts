export interface Ipost {
	postId: number;
	subject: string;
	title: string;
	content: string;
	tag: string[];
	voteCount?: number;
	viewCount?: number;
	postCreatedAt?: string;
	postModifiedAt?: string;
	image: string[];
	member: {
		createdAt?: string;
		modifiedAt?: string;
		memberId?: 1;
		email: string;
		password?: string;
		nickname?: string;
		mbti?: string;
		badge?: null | string;
		img?: string;
		roles?: string;
		memberStatus?: string;
	};
}
export type Iposts = Ipost[];
