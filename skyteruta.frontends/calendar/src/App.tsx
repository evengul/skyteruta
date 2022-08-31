import { useLocalStorage } from 'react-use';
import { Calendar } from './components/calendars/calendar';
import { Container } from './components/container';
import { STORAGE_KEYS } from './constants/keys';
import { useEvents } from './hooks/useEvents';
import { CalendarMode } from './types/calendarMode.interface';

export type ModeProps = {
  mode: React.SetStateAction<CalendarMode>;
  setMode: React.Dispatch<CalendarMode>;
};

const defaultMode = 'MONTH' as const;

export default function App() {
  const [persistedMode, setMode] = useLocalStorage<CalendarMode>(STORAGE_KEYS.CALENDAR_MODE, defaultMode);
  const mode = persistedMode ?? defaultMode;
  const events = useEvents(mode);
  return (
    <Container mode={mode} setMode={setMode}>
      <Calendar mode={mode} events={events} />
    </Container>
  );
}
