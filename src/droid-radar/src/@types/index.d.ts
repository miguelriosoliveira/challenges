export type Protocol =
	| 'closest-enemies'
	| 'furthest-enemies'
	| 'assist-allies'
	| 'avoid-crossfire'
	| 'prioritize-mech'
	| 'avoid-mech';

export interface Coordinate {
	x: number;
	y: number;
}

export interface Enemy {
	type: 'soldier' | 'mech';
	number: number;
}

export interface Scan {
	coordinates: Coordinate;
	enemies: Enemy;
	allies?: number;
}

export interface RadarReading {
	protocols: Protocol[];
	scan: Scan[];
}
