import { Coordinate, Protocol, RadarReading, Scan } from '../@types';
import { getDistanceFromZero } from '../utils/math';

const filters: { [key in Protocol]: (enemyScans: Scan[]) => Scan[] } = {
	'prioritize-mech': enemyScans =>
		enemyScans.filter(enemyScan => enemyScan.enemies.type === 'mech'),
	'avoid-mech': enemyScans => enemyScans.filter(enemyScan => enemyScan.enemies.type !== 'mech'),
	'avoid-crossfire': enemyScans => enemyScans.filter(enemyScan => !enemyScan.allies),
	'assist-allies': enemyScans => enemyScans.filter(enemyScan => !!enemyScan.allies),
	'closest-enemies': enemyScans =>
		enemyScans.sort(
			(a, b) => getDistanceFromZero(a.coordinates) - getDistanceFromZero(b.coordinates),
		),
	'furthest-enemies': enemyScans =>
		enemyScans.sort(
			(a, b) => getDistanceFromZero(b.coordinates) - getDistanceFromZero(a.coordinates),
		),
};

export function findStrikePoint({ protocols, scan }: RadarReading): Coordinate {
	let enemyScans = [...scan];
	protocols.forEach(protocol => {
		enemyScans = filters[protocol](enemyScans);
	});

	const [target] = enemyScans;
	return target.coordinates;
}
