import { Event } from '~/types/event.interface';
import { DayCalendar } from './dayCalendar';
import { MonthCalendar } from './monthCalendar';
import { WeekCalendar } from './weekCalendar';
import './calendar.css';

export interface CalendarProps {
  mode: 'DAY' | 'WEEK' | 'MONTH';
  events: Event[];
}

export const Calendar = ({ events, mode }: CalendarProps) => {
  switch (mode) {
    case 'DAY':
      return <DayCalendar events={events} />;
    case 'WEEK':
      return <WeekCalendar events={events} />;
    case 'MONTH':
      return <MonthCalendar events={events} />;
    default:
      throw new TypeError('CalanderMode must be day, week or month');
  }
};
