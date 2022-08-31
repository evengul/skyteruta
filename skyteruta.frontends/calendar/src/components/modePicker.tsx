import { useCallback } from 'react';
import { ModeProps } from '~/App';
import { CalendarMode } from '~/types/calendarMode.interface';

const modes: { [p in CalendarMode]: string } = { DAY: 'DAG', WEEK: 'UKE', MONTH: 'MÅNED' };

export const ModePicker = ({ mode, setMode }: ModeProps) => {
  const handleSetMode = useCallback((mode: CalendarMode) => () => setMode(mode), [mode, setMode]);
  return (
    <>
      {Object.entries(modes).map(([value, text]) => (
        <button key={value} disabled={mode === value} onClick={handleSetMode(value as CalendarMode)}>
          {text}
        </button>
      ))}
    </>
  );
};
