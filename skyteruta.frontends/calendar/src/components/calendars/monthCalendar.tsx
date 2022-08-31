import { CalendarProps } from './calendar';

type MonthCalendarProps = Omit<CalendarProps, 'mode'>;

export const MonthCalendar = ({ events }: MonthCalendarProps) => {
  return <p>Month events: {events.length}</p>;
};
