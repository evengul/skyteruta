import { CalendarProps } from './calendar';

type WeekCalendarProps = Omit<CalendarProps, 'mode'>;

export const WeekCalendar = ({ events }: WeekCalendarProps) => {
  return <p>Week events: {events.length}</p>;
};
