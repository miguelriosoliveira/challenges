import { toast } from 'react-toastify';

export function urlify(text: string) {
	const urlRegex = /(https?:\/\/\S+)/g;
	return text.replace(
		urlRegex,
		url => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`,
	);
}

export const notifyError = (message: string) => toast.error(message, { theme: 'colored' });
