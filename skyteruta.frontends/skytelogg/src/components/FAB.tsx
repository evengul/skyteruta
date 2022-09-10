import { Button, ButtonProps } from '@mantine/core';

type FABProps = ButtonProps;

export default function FAB({ ...buttonProps }: FABProps) {
  return <Button {...buttonProps}></Button>;
}
