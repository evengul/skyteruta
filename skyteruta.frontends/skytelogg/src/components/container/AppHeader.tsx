import { Burger, Group, Header, MediaQuery, Title, useMantineTheme } from '@mantine/core';
import { SetStateAction } from 'react';

interface AppHeaderProps {
  opened: boolean;
  setOpened: React.Dispatch<SetStateAction<boolean>>;
}

export default function AppHeader({ opened, setOpened }: AppHeaderProps) {
  const theme = useMantineTheme();
  return (
    <Header height={60} p={'xs'}>
      <Group sx={{ height: '100%' }} px={20} position='apart'>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignContent: 'center',
            height: '100%',
          }}
        >
          <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size='sm'
              color={theme.colors.gray[6]}
              mr='xl'
              sx={{ height: '100%' }}
            />
          </MediaQuery>
          <Title>Skytelogg</Title>
        </div>
      </Group>
    </Header>
  );
}
