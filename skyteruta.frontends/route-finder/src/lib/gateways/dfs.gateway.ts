import type { Event } from '$lib/types/event.interface';
import axios from 'axios';
import type { Competition } from '../types/competition.interface';

type EventResponse = {
	events: {
		months: {
			events: Event[];
		}[];
	}[];
};

class DfsGateway {
	private eastBound = 31.07;
	private northBound = 71.14;
	private westBound = 4.94;
	private southBound = 57.97;
	async getCompetitions(): Promise<Competition[]> {
		const events = await this.getDfsCompetitions();
		const ourEvents = events
			.map((event) => ({
				id: event.eventId,
				title: event.name,
				organizer: event.organizer,
				isSelected: false,
				coordinates: this.parseCoordinates(event.mapUrl)
			}))
			.filter(
				({ coordinates: [lat, lng] }) =>
					lng > this.westBound &&
					lng < this.eastBound &&
					lat < this.northBound &&
					lat > this.southBound
			);
		return ourEvents;
	}
	private async getDfsCompetitions() {
		const allEvents = await axios.get<EventResponse>(this.getUrl());
		return allEvents.data.events.flatMap((yearEvents) =>
			yearEvents.months.flatMap((monthEvents) => monthEvents.events)
		);
	}

	private getUrl() {
		const base = 'https://mittdfs.no/api/calendar?tab=all';

		const today = new Date();
		const inOneMonth = new Date();
		inOneMonth.setMonth(inOneMonth.getMonth() + 1);

		return `${base}&dateFrom=${this.dateToParam(today)}&dateTo=${this.dateToParam(inOneMonth)}`;
	}

	private dateToParam(date: Date) {
		return `${date.getFullYear()}-${date.getMonth() < 10 ? '0' : ''}${date.getMonth() + 1}-${
			date.getDate() < 10 ? '0' : ''
		}${date.getDate()}`;
	}

	/**
	 *
	 * @param mapLink Example: https://www.google.com/maps/place/60.8941121087121,10.1032203790779
	 */
	private parseCoordinates(mapLink: string): [number, number] {
		return mapLink
			.substring(mapLink.lastIndexOf('/') + 1)
			.split(',')
			.map((coordinate) => Number.parseFloat(coordinate)) as [number, number];
	}
}

export default new DfsGateway();
