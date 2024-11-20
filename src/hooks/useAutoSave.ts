import { useState, useEffect, useRef } from 'react';
import { Document } from '../types';
import { api } from '../services/api';

export function useAutoSave(documents: Document[], hasChanges: boolean) {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const timeoutRef = useRef<number>();

  useEffect(() => {
    if (!hasChanges) return;

    const save = async () => {
      setIsSaving(true);
      try {
        await api.saveDocuments(documents);
        setLastSaved(new Date());
      } catch (error) {
        console.error('Failed to auto-save:', error);
      } finally {
        setIsSaving(false);
      }
    };

    clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(save, 5000);

    return () => clearTimeout(timeoutRef.current);
  }, [documents, hasChanges]);

  return { isSaving, lastSaved };
}