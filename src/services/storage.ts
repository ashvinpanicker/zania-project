import { Document } from '../types';

const STORAGE_KEY = 'document-manager-data';

export const storage = {
  getData: (): Document[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  setData: (documents: Document[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
  },

  initialize: (defaultData: Document[]): void => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    }
  }
};