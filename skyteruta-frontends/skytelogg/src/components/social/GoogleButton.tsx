import { Button, ButtonProps } from '@mantine/core';
import { getAuth } from 'firebase/auth';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import GoogleIcon from './GoogleIcon';

export default function GoogleButton(props: ButtonProps) {
  const [signIn] = useSignInWithGoogle(getAuth());
  return (
    <Button
      onClick={() => signIn()}
      leftIcon={<GoogleIcon />}
      variant='default'
      color='gray'
      {...props}
    />
  );
}
