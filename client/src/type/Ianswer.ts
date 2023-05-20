export interface Ianswer {
	content: string;
	commentId: number;
	vote: number;
	postId: number;
	voteCount: number;
	nickname: string;
}
export type Ianswers = Ianswer[];
