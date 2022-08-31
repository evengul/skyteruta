import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
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
      ? query(
          collection(getFirestore(), collectionName),
          where('owner', '==', user.uid),
          orderBy('createdAt', 'desc'),
        )
      : undefined,
  );

  const logs = useMemo(() => {
    return (data ?? []) as LogEntry[];
  }, [data]);

  const handleAddOrEdit = useCallback((entry: Omit<LogEntry, 'id'>) => {
    const ref = doc(collection(getFirestore(), collectionName));
    setDoc(ref, { ...entry, id: ref.id });
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
