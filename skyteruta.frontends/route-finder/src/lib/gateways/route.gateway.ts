import { Client, TravelMode, Status } from '@googlemaps/google-maps-services-js';
import type { Competition } from '$lib/types/competition.interface';
import type { DistanceMatrix } from '$lib/types/distanceMatrix.interface';
import { BiDirectionalMap } from '$lib/BiDirectionalMap';

class RouteGateway {
	async getMatrix(
		competitions: Pick<Competition, 'id' | 'coordinates' | 'title'>[]
	): Promise<DistanceMatrix> {
		const googleRows = await this.getGoogleMatrix(
			competitions.map((competition) => competition.coordinates)
		);

		const map = new BiDirectionalMap<{
			fromTitle: string;
			from: [number, number];
			to: [number, number];
			kilometers: number;
			minutes: number;
		}>();

		competitions.forEach((c1, i1) => {
			competitions.forEach((c2, i2) => {
				const { distance, duration, status } = googleRows[i1].elements[i2];
				if (status === Status.ZERO_RESULTS) {
					if (c1.id === c2.id) {
						map.put(c1.id, c2.id, {
							fromTitle: c1.title,
							from: c1.coordinates,
							to: c2.coordinates,
							kilometers: 0,
							minutes: 0
						});
					} else {
						map.put(c1.id, c2.id, {
							fromTitle: c1.title,
							from: c1.coordinates,
							to: c2.coordinates,
							kilometers: Number.MAX_SAFE_INTEGER,
							minutes: Number.MAX_SAFE_INTEGER
						});
					}
				} else {
					map.put(c1.id, c2.id, {
						fromTitle: c1.title,
						from: c1.coordinates,
						to: c2.coordinates,
						kilometers: distance.value / 1000,
						minutes: duration.value / 60
					});
				}
			});
		});

		return map.getClean();
	}

	private async getGoogleMatrix(locations: [number, number][]) {
		const client = new Client();
		const key = process.env.MAPS_KEY;
		if (!key) throw new Error('Maps key not initialized');
		const result = await client.distancematrix({
			params: { key, origins: locations, destinations: locations, mode: TravelMode.driving }
		});
		if (result.status !== 200) {
			throw new Error('Unknown error: ' + result.statusText);
		}
		if (result.data.status !== Status.OK) {
			throw new Error(result.data.error_message);
		}
		return result.data.rows;
	}
}

export default new RouteGateway();
