export interface Iuser {
	id?: number;
	nickname: string;
	email?: string;
	mbti: string;
	img?: string;
	badge?: null | string;
}
export interface Imember {
	memberId?: number;
	nickname: string;
	badge?: null | string;
	email?: string;
	img?: string;
	memberStatus?: string;
}

export type Imembers = Imember[];
