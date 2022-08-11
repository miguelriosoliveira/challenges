import { urlify } from '../src/utils';

describe('utils', () => {
	it('should turn a string URL into an anchor tag', () => {
		const url = 'https://www.google.com';
		const anchor = urlify(url);
		expect(anchor).toBe(`<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
	});

	it('should turn any URLs inside a string into anchors', () => {
		const url1 = 'https://www.google.com';
		const url2 = 'https://www.apple.com';
		const text = `This is a link to ${url1} and ${url2}`;
		const anchor1 = `<a href="${url1}" target="_blank" rel="noopener noreferrer">${url1}</a>`;
		const anchor2 = `<a href="${url2}" target="_blank" rel="noopener noreferrer">${url2}</a>`;

		const textWithAnchors = urlify(text);

		expect(textWithAnchors).toBe(`This is a link to ${anchor1} and ${anchor2}`);
	});
});
