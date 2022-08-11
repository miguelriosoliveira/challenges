type NestedArray = Array<number | NestedArray>;

export function flatten(arr: NestedArray): number[] {
	return arr.reduce<number[]>((acc, item) => {
		if (Array.isArray(item)) {
			return [...acc, ...flatten(item)];
		}
		return [...acc, item];
	}, []);
}
