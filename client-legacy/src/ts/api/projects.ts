import type { Project } from '../../types/Project';

const API_BASE_URL = 'http://localhost:5000/api';
const SERVER_BASE_URL = 'http://localhost:5000';

// Helper function to resolve image URLs
const resolveImageUrl = (imagePath: string | undefined): string => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `${SERVER_BASE_URL}${imagePath}`;
};

export const projectsAPI = {
  getAll: async (): Promise<Project[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      
      // Resolve image URLs for all projects
      if (data.data) {
        return data.data.map((project: Project) => ({
          ...project,
          image: resolveImageUrl(project.image),
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  create: async (formData: FormData): Promise<Project> => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to create project');
      const data = await response.json();
      return {
        ...data.data,
        image: resolveImageUrl(data.data.image),
      };
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete project');
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },
};
