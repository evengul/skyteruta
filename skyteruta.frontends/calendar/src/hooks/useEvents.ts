import { useMemo } from 'react';
import isWithinInterval from 'date-fns/isWithinInterval';
import areIntervalsOverlapping from 'date-fns/areIntervalsOverlapping';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import compareAsc from 'date-fns/compareAsc';
import { CalendarMode } from '~/types/calendarMode.interface';
import { Event } from '~/types/event.interface';
import { events } from '~/__mocks__/events.mocks';

export const useEvents = (mode: CalendarMode): Event[] => {
  const data = events;

  return useMemo(() => {
    return data
      .filter(({ from: start, to: end }) => {
        const now = Date.now();
        const interval: Interval = { start: startOfDay(start), end: endOfDay(end) };
        const monthInterval = { start: startOfMonth(now), end: endOfMonth(now) };
        const weekInterval = { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfWeek(now, { weekStartsOn: 1 }) };
        if (mode === 'DAY') {
          return isWithinInterval(now, interval);
        } else if (mode === 'WEEK') {
          return areIntervalsOverlapping(weekInterval, interval, { inclusive: true });
        } else if (mode === 'MONTH') {
          return areIntervalsOverlapping(monthInterval, interval, { inclusive: true });
        }
        throw new TypeError('CalendarMode must be DAY, WEEK or MONTH.');
      })
      .sort((a, b) => compareAsc(b.to, a.to));
  }, [data, mode]);
};
