export const setLocalStorage = (name: string, value: string | number) => {
	return localStorage.setItem(name, JSON.stringify(value));
};

export const getLocalStorage = (name: string) => {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return JSON.parse(localStorage.getItem(name)!);
};

export const removeLocalStorage = (name: string) => {
	return localStorage.removeItem(name);
};
