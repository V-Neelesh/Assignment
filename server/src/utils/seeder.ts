import { Project } from '../models/Project';
import { Client } from '../models/Client';

export const seedData = async () => {
  try {
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      const projects = [
        {
          name: 'Modern Office Design',
          description: 'A complete renovation of a corporate workspace focusing on open collaboration areas and ergonomic workstations.',
          image: '/images/projects/pexels-brett-sayles-2881232-1.svg'
        },
        {
          name: 'Urban Apartment Complex',
          description: 'Luxury apartment complex design with sustainable materials and modern amenities.',
          image: '/images/projects/pexels-brett-sayles-2881232-2.svg'
        },
        {
          name: 'Creative Studio Space',
          description: 'An inspiring studio environment for a creative agency, featuring natural light and flexible layouts.',
          image: '/images/projects/pexels-brett-sayles-2881232-3.svg'
        }
      ];
      await Project.insertMany(projects);
      console.log('✓ Seeded initial projects');
    }

    const clientCount = await Client.countDocuments();
    if (clientCount === 0) {
      const clients = [
        {
          name: 'Sarah Johnson',
          designation: 'CEO, TechStart',
          description: 'The team transformed our vision into reality. The attention to detail and creative solutions exceeded our expectations.',
          image: '/images/client/pexels-andres-ayrton-6578391.svg'
        },
        {
          name: 'Michael Chen',
          designation: 'Director, Creative Co',
          description: 'Professional, innovative, and reliable. Working with this agency was a game-changer for our brand identity.',
          image: '/images/client/pexels-brett-sayles-2881232.svg'
        },
        {
          name: 'Emma Williams',
          designation: 'Founder, DesignHub',
          description: 'Outstanding service and exceptional results. They truly understood our needs and delivered a masterpiece.',
          image: '/images/client/pexels-fauxels-3182834.svg'
        }
      ];
      await Client.insertMany(clients);
      console.log('✓ Seeded initial clients');
    }
  } catch (error) {
    console.error('Seeding error:', error);
  }
};
