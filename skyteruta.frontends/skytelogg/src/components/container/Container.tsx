import { AppShell } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { PropsWithChildren, useState } from 'react';
import AppHeader from './AppHeader';
import AppNavBar from './AppNavBar';

export default function Container({ children }: PropsWithChildren) {
  const [opened, setOpened] = useState(false);
  return (
    <BrowserRouter>
      <AppShell
        sx={{ padding: 0 }}
        navbar={<AppNavBar opened={opened} setOpened={setOpened} />}
        header={<AppHeader opened={opened} setOpened={setOpened} />}
      >
        {children}
      </AppShell>
    </BrowserRouter>
  );
}
