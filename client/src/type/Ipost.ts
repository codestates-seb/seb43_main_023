export interface Ipost {
	id: number;
	subject: string;
	title: string;
	content?: string;
	nickname: string;
	email: string;
	tag?: null;
	voteCount?: number;
	viewCount?: number;
	createdAt?: string;
	modifiedAt?: string;
}
export type Iposts = Ipost[];
