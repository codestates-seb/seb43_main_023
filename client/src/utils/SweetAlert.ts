import Swal, { SweetAlertResult } from 'sweetalert2';

export interface ISweetAlert {
	isConfirmed: boolean;
	isDenied: boolean;
	isDismissed: boolean;
	value: boolean;
}

// 확인, 취소버튼
export function SweetAlert1(
	title: string,
	text: string,
	confirmButtonText: string,
	cancelButtonText: string,
): Promise<SweetAlertResult<ISweetAlert>> {
	return Swal.fire<ISweetAlert>({
		showCancelButton: true,
		icon: 'warning',
		title,
		text,
		confirmButtonText,
		confirmButtonColor: '#0db4f3',
		cancelButtonColor: '#f37676',
		cancelButtonText,
	});
}

// 확인 버튼만
export function SweetAlert2(
	title: string,
	text: string,
): Promise<SweetAlertResult<ISweetAlert>> {
	return Swal.fire<ISweetAlert>({
		icon: 'success',
		title,
		text,
		confirmButtonColor: '#0db4f3',
	});
}
