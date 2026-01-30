import { projectsAPI } from './api/projects.js';
import { clientsAPI } from './api/clients.js';
import { contactAPI } from './api/contact.js';
import { newsletterAPI } from './api/newsletter.js';
import type { Project } from '../types/Project';
import type { Client } from '../types/Client';
import {
  getElementById,
  queryElement,
  setHTML,
  clearElement,
  addEventListener,
  showToast,
} from './utils.js';

// Initialize landing page
const initLandingPage = async (): Promise<void> => {
  try {
    // Load projects
    await loadProjects();

    // Load clients
    await loadClients();

    // Setup contact form
    setupContactForm();

    // Setup newsletter form
    setupNewsletterForm();
  } catch (error) {
    console.error('Error initializing landing page:', error);
    showToast('Failed to load page content', 'error');
  }
};

// Load and display projects
const loadProjects = async (): Promise<void> => {
  try {
    const projects = await projectsAPI.getAll();
    const projectsContainer = getElementById('projects-container');
    clearElement(projectsContainer);

    if (projects.length === 0) {
      projectsContainer.innerHTML =
        '<p style="text-align: center; padding: 2rem; color: #666;">No projects available yet.</p>';
      return;
    }

    const PROJECT_FALLBACK = '/images/projects/pexels-brett-sayles-2881232-1.svg';

    projects.forEach((project: Project) => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';

      const img = document.createElement('img');
      img.className = 'project-image';
      img.alt = project.name || 'Project image';
      img.src = project.image || PROJECT_FALLBACK;
      img.onerror = () => {
        img.onerror = null;
        img.src = PROJECT_FALLBACK;
      };

      const content = document.createElement('div');
      content.className = 'project-content';
      const h3 = document.createElement('h3');
      h3.textContent = project.name;
      const p = document.createElement('p');
      p.textContent = project.description;
      const a = document.createElement('a');
      a.href = '#';
      a.className = 'read-more-btn';
      a.textContent = 'Read More';

      content.appendChild(h3);
      content.appendChild(p);
      content.appendChild(a);

      projectCard.appendChild(img);
      projectCard.appendChild(content);
      projectsContainer.appendChild(projectCard);
    });
  } catch (error) {
    console.error('Error loading projects:', error);
    showToast('Failed to load projects', 'error');
  }
};

// Load and display clients
const loadClients = async (): Promise<void> => {
  try {
    const clients = await clientsAPI.getAll();
    const clientsContainer = getElementById('clients-container');
    clearElement(clientsContainer);

    if (clients.length === 0) {
      clientsContainer.innerHTML =
        '<p style="text-align: center; padding: 2rem; color: #666;">No clients available yet.</p>';
      return;
    }

    const CLIENT_FALLBACK = '/images/client/pexels-andres-ayrton-6578391.svg';

    clients.forEach((client: Client) => {
      const clientCard = document.createElement('div');
      clientCard.className = 'client-card';

      const img = document.createElement('img');
      img.className = 'client-image';
      img.alt = client.name || 'Client image';
      img.src = client.image || CLIENT_FALLBACK;
      img.onerror = () => {
        img.onerror = null;
        img.src = CLIENT_FALLBACK;
      };

      const desc = document.createElement('div');
      desc.className = 'client-desc';
      desc.textContent = `"${client.description}"`;

      const nameEl = document.createElement('div');
      nameEl.className = 'client-name';
      nameEl.textContent = client.name;

      const desig = document.createElement('div');
      desig.className = 'client-designation';
      desig.textContent = client.designation;

      clientCard.appendChild(img);
      clientCard.appendChild(desc);
      clientCard.appendChild(nameEl);
      clientCard.appendChild(desig);
      clientsContainer.appendChild(clientCard);
    });
  } catch (error) {
    console.error('Error loading clients:', error);
    showToast('Failed to load clients', 'error');
  }
};

// Setup contact form
const setupContactForm = (): void => {
  const contactForm = queryElement<HTMLFormElement>('#contact-form');

  addEventListener(contactForm, 'submit', async (e: Event) => {
    e.preventDefault();

    try {
      const fullName = (queryElement<HTMLInputElement>('#fullName')).value;
      const email = (queryElement<HTMLInputElement>('#email')).value;
      const mobileNumber = (queryElement<HTMLInputElement>('#mobileNumber')).value;
      const city = (queryElement<HTMLInputElement>('#city')).value;

      await contactAPI.submit({
        fullName,
        email,
        mobileNumber,
        city,
      });

      contactForm.reset();
      showToast('Thank you! We will contact you soon.', 'success');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      showToast('Failed to submit contact form', 'error');
    }
  });
};

// Setup newsletter form
const setupNewsletterForm = (): void => {
  const newsletterForm = queryElement<HTMLFormElement>('#newsletter-form');

  addEventListener(newsletterForm, 'submit', async (e: Event) => {
    e.preventDefault();

    try {
      const email = (queryElement<HTMLInputElement>('#newsletter-email')).value;

      await newsletterAPI.subscribe(email);

      newsletterForm.reset();
      showToast('Successfully subscribed to newsletter!', 'success');
    } catch (error: any) {
      console.error('Error subscribing to newsletter:', error);
      const errorMessage =
        error.message.includes('already subscribed')
          ? 'Email already subscribed'
          : 'Failed to subscribe to newsletter';
      showToast(errorMessage, 'error');
    }
  });
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLandingPage);
} else {
  initLandingPage();
}
