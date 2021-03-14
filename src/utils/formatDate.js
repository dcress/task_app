import moment from 'moment';

export default function formatDate(date) {
	const mom = moment(date, 'YYYY-MM-DD');

	return {
		date: mom.calendar(null, {
			sameDay: '[Today]',
			nextDay: '[Tomorrow]',
			nextWeek: 'dddd',
			lastDay: '[Yesterday]',
			lastWeek: '[Last] dddd',
			sameElse: 'MM/DD/YYYY',
		}),
		remainingDays: mom.diff(new Date(), 'days'),
		remainingMins: mom.diff(new Date(), 'minutes'),
	};
}
