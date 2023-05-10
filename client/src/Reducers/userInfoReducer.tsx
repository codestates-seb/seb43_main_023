import { createSlice } from '@reduxjs/toolkit';

export interface Iuser {
	id?: number;
	nickname: string;
	email?: string;
	mbti: string;
	img?: string;
	badge?: null;
	role?: string;
	memberStatus?: string;
	createdAt?: string;
	modifiedAt?: string;
}

const initialState: Iuser = {
	id:
		localStorage.getItem('memberId')! === null
			? 0
			: Number(localStorage.getItem('memberId')!),
	email: '',
	nickname:
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		localStorage.getItem('displayName')! === null
			? ''
			: // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			  localStorage.getItem('displayName')!,
	mbti: '',
	img: '',
	badge: null,
	role: '',
	memberStatus: '',
	createdAt: '',
	modifiedAt: '',
};

const userInfoSlice = createSlice({
	name: 'changeInfo',
	initialState,
	reducers: {
		UPDATE: (state: Iuser, action: any): Iuser => {
			return { ...state, ...action.payload };
		},
		DELETE: (): Iuser => {
			return { ...initialState };
		},
	},
});

export const { UPDATE, DELETE } = userInfoSlice.actions;
export default userInfoSlice.reducer;
