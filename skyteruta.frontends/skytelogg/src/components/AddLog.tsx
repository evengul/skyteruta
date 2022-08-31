import { Button, Group, Modal, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LogEntry } from '../model/logEntry';

interface AddLogProps {
  isOpen: boolean;
  close: () => void;
  onSave: (logEntry: Omit<LogEntry, 'id'>) => void;
  selected?: LogEntry;
}

export default function AddLog({ isOpen, close, onSave, selected }: AddLogProps) {
  const [user] = useAuthState(getAuth());
  const form = useForm({
    initialValues: {
      title: selected?.title ?? '',
      content: selected?.content ?? '',
    },
    validate: {
      title: (title) => (title.length < 3 ? 'Tittelen må være lenger enn 3  bokstaver' : null),
    },
  });

  useEffect(() => {
    console.log('selected changed', selected);
    form.setFieldValue('content', selected?.content ?? '');
    form.setFieldValue('title', selected?.title ?? '');
  }, [selected]);

  if (!user) {
    return null;
  }

  return (
    <Modal opened={isOpen} onClose={close} title={selected ? 'Rediger' : 'Ny skytelogg'}>
      <form
        onSubmit={form.onSubmit((values) => {
          onSave({
            owner: user.uid,
            createdAt: selected?.createdAt ?? new Date().getTime(),
            title: values.title,
            content: values.content,
          });
          form.reset();
          close();
        })}
      >
        <Stack>
          <TextInput
            label='Tittel'
            placeholder='Tittel'
            value={form.values.title}
            onChange={(event) => form.setFieldValue('title', event.currentTarget.value)}
            error={form.errors.title && 'Tittelen må være lenger enn 3 bokstaver'}
          />
          <Textarea
            label='Innhold'
            placeholder='Innhold'
            onChange={(event) => form.setFieldValue('content', event.currentTarget.value)}
            autosize
            minRows={3}
          />
          <Group grow>
            <Button variant='outline' onClick={close}>
              Avbryt
            </Button>
            <Button type='submit'>Lagre</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
