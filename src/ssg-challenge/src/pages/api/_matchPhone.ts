import phonesData from './data.json';

const phonesDataSortedByBiggestPrefix = [...phonesData].sort((a, b) => b.prefix - a.prefix);

export function matchPhone(phone: string) {
	const phoneData = phonesDataSortedByBiggestPrefix.find(({ prefix }) =>
		phone.startsWith(String(prefix)),
	);

	if (!phoneData) {
		throw new Error(`Could not match phone ${phone}`);
	}

	return phoneData;
}
