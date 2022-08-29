import { Group, Paper, PaperProps, Text } from '@mantine/core';
import GoogleButton from '../components/social/GoogleButton';

export default function Login(props: PaperProps) {
  // const [type, toggle] = useToggle<'logg inn' | 'registrer'>(['logg inn', 'registrer']);

  // const form = useForm({
  //   initialValues: {
  //     email: '',
  //     name: '',
  //     password: '',
  //     terms: true,
  //   },
  //   validate: {
  //     email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
  //     password: (val) => (val.length <= 6 ? 'Passord må inneholde minimum 6 bokstaver' : null),
  //   },
  // });
  return (
    <Paper radius='md' p='xl' withBorder {...props}>
      <Text size='lg' weight={500}>
        Velkommen til Skyteloggen, en del av Skyteruta
      </Text>

      <Group grow mb='md' mt='md'>
        <GoogleButton radius={'xl'} />
        {/* <FacebookButton radius={'xl'} /> */}
      </Group>

      {/* <Divider label='Eller fortsett med epost' labelPosition='center' my='lg' />

      <form onSubmit={form.onSubmit(() => {})}>
        <Stack>
          {type === 'registrer' && (
            <TextInput
              label='Navn'
              placeholder='Ditt navn'
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            />
          )}

          <TextInput
            required
            label='Epost'
            placeholder='hei@skyteloggen.no'
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Ugyldig epost'}
          />

          <PasswordInput
            required
            label='Passord'
            placeholder='Ditt passord'
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Passordet må inneholde minimum 6 tegn'}
          />

          {type === 'registrer' && (
            <Checkbox
              label='Jeg godtar vilkårene (foreløpig ingen)'
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group position='apart' mt='xl'>
          <Anchor
            component='button'
            type='button'
            color='dimmed'
            onClick={() => toggle()}
            size='xs'
          >
            {type === 'registrer'
              ? 'Har du allerede en bruker? Logg inn'
              : 'Har du ikke en bruker? Registrer deg'}
          </Anchor>
          <Button type='submit'>{upperFirst(type)}</Button>
        </Group>
      </form> */}
    </Paper>
  );
}
