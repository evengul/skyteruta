import subWeeks from 'date-fns/subWeeks';
import addWeeks from 'date-fns/addWeeks';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import addHours from 'date-fns/addHours';
import clamp from 'date-fns/clamp';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import { Event } from '~/types/event.interface';

const now = new Date();

const events: Event[] = [];

// 2 today, the nine previous and the nine coming days
for (let i = 0; i < 10; i++) {
  const startHours = Math.floor(Math.random() * 11) + 1;
  const extraHours = Math.floor(Math.random() * 11) + 11;
  const from = addHours(startOfDay(addDays(now, i)), startHours);
  const paddedTo = addHours(from, extraHours);
  const to = clamp(paddedTo, { start: from, end: endOfDay(from) });
  events.push({
    id: `Day-${i}`,
    from,
    to,
  });
}

for (let i = 0; i < 10; i++) {
  const extraHours = Math.floor(Math.random() * 23) + 1;
  const startHours = Math.floor(Math.random() * 23) + 1;
  const from = addHours(startOfDay(subDays(now, i)), startHours);
  const paddedTo = addHours(from, extraHours);
  const to = clamp(paddedTo, { start: from, end: endOfDay(from) });
  events.push({
    id: `NegDay-${i}`,
    from,
    to,
  });
}

// 2 this week, the 5 previous and the 5 next weeks
for (let i = 0; i < 5; i++) {
  const extraHours = Math.floor(Math.random() * 23) + 1;
  const startHours = Math.floor(Math.random() * 23) + 1;
  const from = addHours(startOfDay(addWeeks(now, i)), startHours);
  const paddedTo = addHours(from, extraHours);
  const to = clamp(paddedTo, { start: from, end: endOfDay(from) });
  events.push({
    id: `Week-${i}`,
    from,
    to,
  });
}

for (let i = 0; i < 5; i++) {
  const extraHours = Math.floor(Math.random() * 23) + 1;
  const startHours = Math.floor(Math.random() * 23) + 1;
  const from = addHours(startOfDay(subWeeks(now, i)), startHours);
  const paddedTo = addHours(from, extraHours);
  const to = clamp(paddedTo, { start: from, end: endOfDay(from) });
  events.push({
    id: `NegWeek-${i}`,
    from,
    to,
  });
}

export { events };
