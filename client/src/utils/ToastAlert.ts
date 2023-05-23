import Swal from 'sweetalert2';

// 토스트 alert창 공통 컴포넌트 구현
export default function ToastAlert(title: string) {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top',
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast: {
			addEventListener: (arg0: string, arg1: () => void) => void;
		}) => {
			toast.addEventListener('mouseenter', Swal.stopTimer);
			toast.addEventListener('mouseleave', Swal.resumeTimer);
		},
	});
	Toast.fire({
		icon: 'warning',
		title,
	});
}
