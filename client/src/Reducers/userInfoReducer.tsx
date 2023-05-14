import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Iuser {
	memberId?: number;
	nickname: string;
	email?: string;
	mbti: string;
	img?: string;
	badge?: null;
}

const initialState: Iuser = {
	memberId: 0,
	email: '',
	nickname: '',
	mbti: '',
	img: '',
	badge: null,
};

const userInfoSlice = createSlice({
	name: 'changeInfo',
	initialState,
	reducers: {
		UPDATE: (state: Iuser, action: PayloadAction<Iuser>): Iuser => {
			return { ...state, ...action.payload };
		},
		DELETE: (): Iuser => {
			return { ...initialState };
		},
	},
});

export const { UPDATE, DELETE } = userInfoSlice.actions;
export default userInfoSlice.reducer;
