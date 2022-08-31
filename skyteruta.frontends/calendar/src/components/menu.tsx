import { ModeProps } from '~/App';
import { ModePicker } from './modePicker';

export const Menu = ({ mode, setMode }: ModeProps) => {
  return (
    <section>
      <ModePicker mode={mode} setMode={setMode} />
    </section>
  );
};
