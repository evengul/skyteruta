import { Button, ButtonProps } from '@mantine/core';
import { getAuth } from 'firebase/auth';
import { useSignInWithFacebook } from 'react-firebase-hooks/auth';
import FacebookIcon from './FacebookIcon';

export default function FacebookButton(props: ButtonProps) {
  const [signIn] = useSignInWithFacebook(getAuth());

  return (
    <Button
      onClick={() => signIn()}
      leftIcon={<FacebookIcon />}
      sx={(theme) => ({
        backgroundColor: '#4267B2',
        color: '#fff',
        '&:hover': {
          backgroundColor: theme.fn.darken('#4267B2', 0.1),
        },
      })}
      {...props}
    />
  );
}
