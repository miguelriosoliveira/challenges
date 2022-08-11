import { flatten } from "./flatten";

describe("flatten", () => {
	it("should flatten a level-1 nested array", () => {
		const arr = [1, [2, 3], 4];
		expect(flatten(arr)).toEqual([1, 2, 3, 4]);
	});

	it("should flatten a level-2 nested array", () => {
		const arr = [1, [2, [3, 4], 5], 6];
		expect(flatten(arr)).toEqual([1, 2, 3, 4, 5, 6]);
	});

	it("should return the same array when it is already flat", () => {
		const arr = [1, 2, 3, 4];
		expect(flatten(arr)).toEqual([1, 2, 3, 4]);
	});
});
