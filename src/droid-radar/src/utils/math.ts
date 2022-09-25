import { Coordinate } from '../@types';

function getDistance(p1: Coordinate, p2: Coordinate) {
	const deltaX = p2.x - p1.x;
	const deltaY = p2.y - p1.y;
	return Math.sqrt(deltaX ** 2 + deltaY ** 2);
}

export function getDistanceFromZero(p1: Coordinate) {
	const zero = { x: 0, y: 0 };
	return getDistance(p1, zero);
}
