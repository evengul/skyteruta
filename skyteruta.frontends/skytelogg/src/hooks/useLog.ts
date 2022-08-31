import { collection, deleteDoc, doc, getFirestore, query, setDoc, where } from 'firebase/firestore';
import { useCallback, useMemo } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LogEntry } from '../model/logEntry';
import { getAuth } from 'firebase/auth';

const collectionName = 'logs';

export const useLog = () => {
  const [user, loadingUser] = useAuthState(getAuth());
  const [data, loadingData] = useCollectionData(
    user
      ? query(collection(getFirestore(), collectionName), where('owner', '==', user.uid))
      : undefined,
  );

  const logs = useMemo(() => {
    return (data ?? []) as LogEntry[];
  }, [data]);

  const handleAddOrEdit = useCallback((entry: LogEntry) => {
    setDoc(doc(getFirestore(), collectionName, entry.id), entry);
  }, []);

  const handleRemove = useCallback((id: string) => {
    deleteDoc(doc(getFirestore(), collectionName, id));
  }, []);

  return {
    logs,
    persist: handleAddOrEdit,
    remove: handleRemove,
    loading: loadingUser || loadingData,
  };
};
