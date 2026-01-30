import type { Contact } from '../../types/Contact';

const API_BASE_URL = 'http://localhost:5000/api';

export const contactAPI = {
  submit: async (formData: {
    fullName: string;
    email: string;
    mobileNumber: string;
    city: string;
  }): Promise<Contact> => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to submit contact form');
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },

  getAll: async (): Promise<Contact[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`);
      if (!response.ok) throw new Error('Failed to fetch contacts');
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete contact');
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  },
};
