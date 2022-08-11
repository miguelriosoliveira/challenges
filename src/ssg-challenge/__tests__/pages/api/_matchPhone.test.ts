import { matchPhone } from '../../../src/pages/api/_matchPhone';

describe('matchPhone', () => {
	it('should match with a phone in the list of phones', () => {
		const phone = '14373293504';
		const phoneData = matchPhone(phone);
		expect(phoneData).toEqual({
			prefix: 1_437_329,
			operator: 'Lucky Mobileeeeeeeee',
			country_code: 1,
			country: 'Canada',
			region: 'Ontario',
		});
	});
});
