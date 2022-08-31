import { useMemo } from 'react';
import { CalendarProps } from './calendar';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import addHours from 'date-fns/addHours';
import subHours from 'date-fns/subHours';
import clamp from 'date-fns/clamp';
import eachHourOfInterval from 'date-fns/eachHourOfInterval';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfHour from 'date-fns/startOfHour';
import endOfHour from 'date-fns/endOfHour';

type DayCalendarProps = Pick<CalendarProps, 'events'>;

const todayInterval = { start: startOfDay(Date.now()), end: endOfDay(Date.now()) };

export const DayCalendar = ({ events }: DayCalendarProps) => {
  const [start, end] = useMemo(() => {
    if (events.length === 0) {
      return [todayInterval.start, todayInterval.end];
    } else if (events.length === 1) {
      return [clamp(subHours(events[0].from, 1), todayInterval), clamp(addHours(events[0].to, 1), todayInterval)];
    } else {
      return [
        clamp(subHours(events[0].from, 1), todayInterval),
        clamp(addHours(events[events.length - 1].to, 1), todayInterval),
      ];
    }
  }, [events]);
  const hours = eachHourOfInterval({ start, end });

  if (events.length === 0 || hours.length === 0) {
    return <p>Ingen arrangementer i dag</p>;
  }
  return (
    <table className='calendar calendar-day'>
      <thead className='calendar-head calendar-day-head'>
        <tr className='calendar-head-row calendar-day-head-row'>
          <th className='calendar-header calendar-day-header'>Time</th>
          {events.map(event => (
            <th key={event.id} className='calendar-header calendar-day-header'>
              {event.id}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='calendar-body calendar-day-body'>
        {hours.map(hour => (
          <tr key={hour.getTime()} className='calendar-row calendar-day-row'>
            <td className='calendar-cell calendar-day-cell'>{hour.getHours()}</td>
            {events.map(event => {
              const hasContent = isWithinInterval(hour, { start: startOfHour(event.from), end: endOfHour(event.to) });
              return (
                <td
                  key={event.id}
                  className={`calendar-cell calendar-day-cell ${
                    hasContent ? 'calendar-cell-filled calendar-day-cell-filled' : ''
                  }`}
                >
                  {' '}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
