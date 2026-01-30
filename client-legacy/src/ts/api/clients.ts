import type { Client } from '../../types/Client';

const API_BASE_URL = 'http://localhost:5000/api';
const SERVER_BASE_URL = 'http://localhost:5000';


// Helper function to resolve image URLs
const resolveImageUrl = (imagePath: string | undefined): string => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `${SERVER_BASE_URL}${imagePath}`;
};

export const clientsAPI = {
  getAll: async (): Promise<Client[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/clients`);
      if (!response.ok) throw new Error('Failed to fetch clients');
      const data = await response.json();
      
      // Resolve image URLs for all clients
      if (data.data) {
        return data.data.map((client: Client) => ({
          ...client,
          image: resolveImageUrl(client.image),
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching clients:', error);
      throw error;
    }
  },

  create: async (formData: FormData): Promise<Client> => {
    try {
      const response = await fetch(`${API_BASE_URL}/clients`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to create client');
      const data = await response.json();
      return {
        ...data.data,
        image: resolveImageUrl(data.data.image),
      };
    } catch (error) {
      console.error('Error creating client:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete client');
    } catch (error) {
      console.error('Error deleting client:', error);
      throw error;
    }
  },
};
