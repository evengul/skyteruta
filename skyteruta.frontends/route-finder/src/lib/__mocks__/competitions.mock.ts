import type { Competition } from '../types/competition.interface';

const competitions: Competition[] = [
	{
		id: 0,
		title: 'Stevne 1',
		organizer: 'Aas',
		coordinates: [59.606931, 10.8721828],
		isSelected: false
	},
	{
		id: 2,
		title: 'Stevne 3',
		organizer: 'Trondhjems',
		coordinates: [63.23599, 10.202367],
		isSelected: false
	},
	{
		id: 3,
		title: 'Stevne 4',
		organizer: 'Hobøl',
		coordinates: [59.603825, 10.936875],
		isSelected: false
	}
];

export default competitions;
