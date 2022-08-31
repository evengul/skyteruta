import { Button, List, Paper, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import AddLog from '../components/AddLog';
import { useLog } from '../hooks/useLog';
import { LogEntry } from '../model/logEntry';

export default function Overview() {
  const { logs, loading, persist } = useLog();
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState<LogEntry>();

  if (loading) {
    return <p>Laster inn dine logger...</p>;
  }

  return (
    <Paper>
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
          <Button onClick={() => setOpened(true)}>Lag ny logg</Button>
          <List>
            {logs
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((log) => {
                const date = new Date(log.createdAt);
                const formatted = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
                return (
                  <List.Item key={log.id} onClick={() => setSelected(log)}>
                    {log.title} - {formatted}
                  </List.Item>
                );
              })}
          </List>
        </>
      )}
    </Paper>
  );
}
