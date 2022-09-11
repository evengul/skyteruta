import { Box, ActionIcon, Stack, Text, Timeline, Skeleton } from '@mantine/core';
import { useState } from 'react';
import { IconEdit, IconTrash } from '@tabler/icons';
import AddLog from '../components/AddLog';
import { useLog } from '../hooks/useLog';
import { LogEntry } from '../model/logEntry';

export default function Logs() {
  const { logs, persist, remove, loading } = useLog();
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState<LogEntry>();

  return (
    <Stack>
      <AddLog
        isOpen={opened || selected !== undefined}
        close={() => {
          setOpened(false);
          setSelected(undefined);
        }}
        onSave={persist}
        selected={selected}
      />
      <Timeline active={0}>
        {loading ? (
          <Timeline.Item>
            <Stack>
              <Skeleton height={15} width={'40%'} />
              <Skeleton height={15} width={'80%'} />
            </Stack>
          </Timeline.Item>
        ) : (
          logs.map((log) => (
            <Timeline.Item key={log.id} title={`${log.title}: ${formatTime(log.createdAt)}`}>
              <Stack
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Text>{log.content}</Text>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                  <ActionIcon onClick={() => setSelected(log)}>
                    <IconEdit />
                  </ActionIcon>
                  <ActionIcon onClick={() => remove(log.id)}>
                    <IconTrash color='red' />
                  </ActionIcon>
                </Box>
              </Stack>
            </Timeline.Item>
          ))
        )}
      </Timeline>
    </Stack>
  );
}

function formatTime(time: number) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dateOfMonth = date.getDate();
  return `${dateOfMonth < 10 ? '0' : ''}${dateOfMonth}-${month < 10 ? '0' : ''}${month}-${year}`;
}
