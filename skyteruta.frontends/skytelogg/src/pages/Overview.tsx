import { Box, Button, createStyles, Paper, Stack, Text, Timeline, Title } from '@mantine/core';
import { useState } from 'react';
import AddLog from '../components/AddLog';
import { useLog } from '../hooks/useLog';
import { LogEntry } from '../model/logEntry';

const useStyles = createStyles(() => ({
  fab: {
    position: 'absolute',
    right: '2em',
    bottom: '2em',
    borderRadius: '100%',
    height: '4em',
    width: '4em',
  },
}));

export default function Overview() {
  const { classes } = useStyles();

  const { logs, loading, persist } = useLog();
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState<LogEntry>();

  if (loading) {
    return <p>Laster inn dine logger...</p>;
  }

  return (
    <>
      <Button className={classes.fab} onClick={() => setOpened(true)}>
        +
      </Button>
      <Paper>
        <Title order={1}>Skytelogg</Title>
        <AddLog
          isOpen={opened || selected !== undefined}
          close={() => {
            setOpened(false);
            setSelected(undefined);
          }}
          onSave={persist}
          selected={selected}
        />
        {logs.length === 0 ? (
          <Stack>
            <Text>Du har ingen logger.</Text>
            <Button onClick={() => setOpened(true)}>Lag din første nå</Button>
          </Stack>
        ) : (
          <>
            <Timeline active={0}>
              {logs.map((log) => (
                <Timeline.Item key={log.id} title={`${log.title}: ${formatTime(log.createdAt)}`}>
                  <Stack
                    sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                  >
                    <Box>
                      <Text>{log.content}</Text>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                      <Button onClick={() => setSelected(log)}>Rediger</Button>
                    </Box>
                  </Stack>
                </Timeline.Item>
              ))}
            </Timeline>
          </>
        )}
      </Paper>
    </>
  );
}

function formatTime(time: number) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dateOfMonth = date.getDate();
  return `${dateOfMonth < 10 ? '0' : ''}${dateOfMonth}-${month < 10 ? '0' : ''}${month}-${year}`;
}
