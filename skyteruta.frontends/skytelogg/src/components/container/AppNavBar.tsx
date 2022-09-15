import { Navbar, NavLink, Stack } from '@mantine/core';
import { IconNotebook, IconRun } from '@tabler/icons';
import { Link, useLocation } from 'react-router-dom';
import React, { ReactNode } from 'react';

interface MenuButtonProps {
  label: string;
  icon: ReactNode;
  link: string;
  onClick: () => void;
}

function MenuButton({ label, icon, link, onClick }: MenuButtonProps) {
  const location = useLocation();
  return (
    <NavLink
      component={Link}
      to={link}
      active={location.pathname === link}
      icon={icon}
      label={label}
      onClick={onClick}
    />
  );
}

const links = [
  { label: 'Logg', icon: <IconNotebook size={16} />, link: '/' },
  { label: 'Trening', icon: <IconRun size={16} />, link: '/trening' },
];

interface AppNavbarProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AppNavBar({ opened, setOpened }: AppNavbarProps) {
  return (
    <Navbar
      p='md'
      width={{ sm: 200, lg: 300 }}
      hiddenBreakpoint='sm'
      height={'100vh'}
      hidden={!opened}
    >
      <Stack sx={{ margin: 5 }}>
        {links.map((link) => (
          <MenuButton
            key={link.label}
            label={link.label}
            icon={link.icon}
            link={link.link}
            onClick={() => setOpened(false)}
          />
        ))}
      </Stack>
    </Navbar>
  );
}
