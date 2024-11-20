import { Document } from '../types';

const API_URL = '/api/documents';

export const api = {
  fetchDocuments: async (): Promise<Document[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch documents');
    return response.json();
  },

  saveDocuments: async (documents: Document[]): Promise<Document[]> => {
    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(documents),
    });
    if (!response.ok) throw new Error('Failed to save documents');
    return response.json();
  }
};