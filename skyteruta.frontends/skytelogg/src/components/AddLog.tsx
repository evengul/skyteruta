import { Button, Group, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LogEntry } from '../model/logEntry';

interface AddLogProps {
  isOpen: boolean;
  close: () => void;
  onSave: (logEntry: Omit<LogEntry, 'id'> & { id?: string }) => void;
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
    form.setFieldValue('content', selected?.content ?? '');
    form.setFieldValue('title', selected?.title ?? '');
  }, [selected, isOpen]);

  if (!user) {
    return null;
  }

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        onSave({
          id: selected?.id,
          owner: user.uid,
          createdAt: selected?.createdAt ?? new Date().getTime(),
          performedAt: selected?.performedAt ?? null,
          title: values.title,
          content: values.content,
          plan: null,
        });
        form.reset();
        close();
      })}
    >
      <Stack>
        <TextInput
          placeholder='Tittel'
          value={form.values.title}
          onChange={(event) => form.setFieldValue('title', event.currentTarget.value)}
          error={form.errors.title && 'Tittelen må være lenger enn 3 bokstaver'}
        />
        <Textarea
          placeholder='Innhold'
          value={form.values.content}
          onChange={(event) => form.setFieldValue('content', event.currentTarget.value)}
          autosize
          minRows={3}
        />
        <Group grow>
          <Button type='submit'>Lagre</Button>
        </Group>
      </Stack>
    </form>
  );
}
