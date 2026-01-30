const API_BASE_URL = 'http://localhost:5000/api';

export interface NewsletterSubscriber {
  _id: string;
  email: string;
  createdAt: string;
}

export const newsletterAPI = {
  subscribe: async (email: string): Promise<NewsletterSubscriber> => {
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error('Failed to subscribe to newsletter');
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }
  },

  getAll: async (): Promise<NewsletterSubscriber[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter`);
      if (!response.ok) throw new Error('Failed to fetch newsletter subscribers');
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching newsletter subscribers:', error);
      throw error;
    }
  },

  unsubscribe: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to unsubscribe from newsletter');
    } catch (error) {
      console.error('Error unsubscribing from newsletter:', error);
      throw error;
    }
  },
};
