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
import { useCallback, useEffect, useMemo } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LogEntry } from '../model/logEntry';
import { getAuth } from 'firebase/auth';

const collectionName = 'logs';

export const useLog = () => {
  const [user, loadingUser] = useAuthState(getAuth());
  const [data, loadingData, dataError] = useCollectionData(
    user
      ? query(
          collection(getFirestore(), collectionName),
          where('owner', '==', user.uid),
          orderBy('performedAt', 'desc'),
        )
      : undefined,
  );

  useEffect(() => {
    if (dataError) {
      console.warn('Firestore error for logs: ', dataError);
    }
  });

  const logs = useMemo(() => {
    return (data ?? []) as LogEntry[];
  }, [data]);

  const handleAddOrEdit = useCallback((entry: Omit<LogEntry, 'id'> & { id?: string }) => {
    const ref = entry.id
      ? doc(getFirestore(), collectionName, entry.id)
      : doc(collection(getFirestore(), collectionName));
    setDoc(ref, { ...entry, id: ref.id, archived: false });
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
