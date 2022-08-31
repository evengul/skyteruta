import { ModeProps } from '~/App';
import { WithChildren } from '~/types/withChildren.type';
import { Menu } from './menu';

export const Container = ({ children, ...modeProps }: WithChildren<ModeProps>) => {
  return (
    <div>
      <Menu {...modeProps} />
      <div>{children}</div>
    </div>
  );
};
