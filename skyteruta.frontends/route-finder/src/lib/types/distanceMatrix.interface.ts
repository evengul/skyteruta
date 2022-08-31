import type { Competition } from './competition.interface';

export type DistanceMatrix = Record<
	Competition['id'],
	Record<
		Competition['id'],
		{
			fromTitle: string;
			from: [number, number];
			to: [number, number];
			kilometers: number;
			minutes: number;
		}
	>
>;
