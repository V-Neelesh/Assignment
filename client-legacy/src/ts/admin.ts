import { projectsAPI } from './api/projects.js';
import { clientsAPI } from './api/clients.js';
import { contactAPI } from './api/contact.js';
import { newsletterAPI, NewsletterSubscriber } from './api/newsletter.js';
import {
  getElementById,
  queryElement,
  queryAllElements,
  setHTML,
  clearElement,
  addEventListener,
  showToast,
} from './utils.js';

// Initialize admin panel
const initAdminPanel = async (): Promise<void> => {
  try {
    setupProjectTab();
    setupClientTab();
    setupContactTab();
    setupNewsletterTab();
    setupTabNavigation();

    // Load initial data
    await loadProjects();
  } catch (error) {
    console.error('Error initializing admin panel:', error);
    showToast('Failed to initialize admin panel', 'error');
  }
};

// Setup tab navigation
const setupTabNavigation = (): void => {
  const tabButtons = queryAllElements<HTMLButtonElement>('.tab-button');
  const tabContents = queryAllElements<HTMLDivElement>('.tab-content');

  tabButtons.forEach((button) => {
    addEventListener(button, 'click', () => {
      const tabId = button.getAttribute('data-tab');

      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove('active'));
      tabContents.forEach((content) => content.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      if (tabId) {
        const content = getElementById(`${tabId}-content`);
        content.classList.add('active');

        // Load data for the tab
        if (tabId === 'projects') loadProjects();
        else if (tabId === 'clients') loadClients();
        else if (tabId === 'contacts') loadContacts();
        else if (tabId === 'newsletter') loadNewsletterSubscribers();
      }
    });
  });
};

// ===== PROJECT TAB =====
const setupProjectTab = (): void => {
  const projectForm = queryElement<HTMLFormElement>('#project-form');

  addEventListener(projectForm, 'submit', async (e: Event) => {
    e.preventDefault();

    try {
      const formData = new FormData(projectForm);

      await projectsAPI.create(formData);

      projectForm.reset();
      showToast('Project added successfully!', 'success');
      await loadProjects();
    } catch (error) {
      console.error('Error adding project:', error);
      showToast('Failed to add project', 'error');
    }
  });
};

const loadProjects = async (): Promise<void> => {
  try {
    const projects = await projectsAPI.getAll();
    const projectsList = getElementById('projects-list');
    clearElement(projectsList);

    if (projects.length === 0) {
      projectsList.innerHTML =
        '<p style="text-align: center; padding: 2rem; color: #666;">No projects added yet.</p>';
      return;
    }

    projects.forEach((project: any) => {
      const projectItem = document.createElement('div');
      projectItem.className = 'list-item';
      projectItem.innerHTML = `
        <div class="item-content">
          <img src="${project.image}" alt="${project.name}" class="item-image" />
          <div class="item-details">
            <h4>${project.name}</h4>
            <p>${project.description}</p>
          </div>
        </div>
        <button class="btn btn-danger delete-btn" data-id="${project._id}">Delete</button>
      `;

      // attach fallback for images
      const projImg = projectItem.querySelector('.item-image') as HTMLImageElement | null;
      const PROJECT_FALLBACK = '/images/projects/pexels-brett-sayles-2881232-1.svg';
      if (projImg) {
        projImg.onerror = () => { projImg.onerror = null; projImg.src = PROJECT_FALLBACK; };
        if (!projImg.src) projImg.src = PROJECT_FALLBACK;
      }

      const deleteBtn = projectItem.querySelector('.delete-btn') as HTMLButtonElement;
      addEventListener(deleteBtn, 'click', async () => {
        if (confirm('Are you sure you want to delete this project?')) {
          try {
            await projectsAPI.delete(project._id);
            showToast('Project deleted successfully!', 'success');
            await loadProjects();
          } catch (error) {
            console.error('Error deleting project:', error);
            showToast('Failed to delete project', 'error');
          }
        }
      });

      projectsList.appendChild(projectItem);
    });
  } catch (error) {
    console.error('Error loading projects:', error);
    showToast('Failed to load projects', 'error');
  }
};

// ===== CLIENT TAB =====
const setupClientTab = (): void => {
  const clientForm = queryElement<HTMLFormElement>('#client-form');

  addEventListener(clientForm, 'submit', async (e: Event) => {
    e.preventDefault();

    try {
      const formData = new FormData(clientForm);

      await clientsAPI.create(formData);

      clientForm.reset();
      showToast('Client added successfully!', 'success');
      await loadClients();
    } catch (error) {
      console.error('Error adding client:', error);
      showToast('Failed to add client', 'error');
    }
  });
};

const loadClients = async (): Promise<void> => {
  try {
    const clients = await clientsAPI.getAll();
    const clientsList = getElementById('clients-list');
    clearElement(clientsList);

    if (clients.length === 0) {
      clientsList.innerHTML =
        '<p style="text-align: center; padding: 2rem; color: #666;">No clients added yet.</p>';
      return;
    }

    clients.forEach((client: any) => {
      const clientItem = document.createElement('div');
      clientItem.className = 'list-item';
      clientItem.innerHTML = `
        <div class="item-content">
          <img src="${client.image}" alt="${client.name}" class="item-image" />
          <div class="item-details">
            <h4>${client.name}</h4>
            <p class="designation">${client.designation}</p>
            <p>${client.description}</p>
          </div>
        </div>
        <button class="btn btn-danger delete-btn" data-id="${client._id}">Delete</button>
      `;

      // attach fallback for images
      const cliImg = clientItem.querySelector('.item-image') as HTMLImageElement | null;
      const CLIENT_FALLBACK = '/images/client/pexels-andres-ayrton-6578391.svg';
      if (cliImg) {
        cliImg.onerror = () => { cliImg.onerror = null; cliImg.src = CLIENT_FALLBACK; };
        if (!cliImg.src) cliImg.src = CLIENT_FALLBACK;
      }

      const deleteBtn = clientItem.querySelector('.delete-btn') as HTMLButtonElement;
      addEventListener(deleteBtn, 'click', async () => {
        if (confirm('Are you sure you want to delete this client?')) {
          try {
            await clientsAPI.delete(client._id);
            showToast('Client deleted successfully!', 'success');
            await loadClients();
          } catch (error) {
            console.error('Error deleting client:', error);
            showToast('Failed to delete client', 'error');
          }
        }
      });

      clientsList.appendChild(clientItem);
    });
  } catch (error) {
    console.error('Error loading clients:', error);
    showToast('Failed to load clients', 'error');
  }
};

// ===== CONTACT TAB =====
const setupContactTab = (): void => {
  // Contact tab just loads data
};

const loadContacts = async (): Promise<void> => {
  try {
    const contacts = await contactAPI.getAll();
    const contactsList = getElementById('contacts-list');
    clearElement(contactsList);

    if (contacts.length === 0) {
      contactsList.innerHTML =
        '<p style="text-align: center; padding: 2rem; color: #666;">No contact submissions yet.</p>';
      return;
    }

    contacts.forEach((contact: any) => {
      const contactItem = document.createElement('div');
      contactItem.className = 'list-item';
      contactItem.innerHTML = `
        <div class="item-details">
          <h4>${contact.fullName}</h4>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Mobile:</strong> ${contact.mobileNumber}</p>
          <p><strong>City:</strong> ${contact.city}</p>
          <p><strong>Date:</strong> ${new Date(contact.createdAt).toLocaleDateString()}</p>
        </div>
        <button class="btn btn-danger delete-btn" data-id="${contact._id}">Delete</button>
      `;

      const deleteBtn = contactItem.querySelector('.delete-btn') as HTMLButtonElement;
      addEventListener(deleteBtn, 'click', async () => {
        if (confirm('Are you sure you want to delete this contact?')) {
          try {
            await contactAPI.delete(contact._id);
            showToast('Contact deleted successfully!', 'success');
            await loadContacts();
          } catch (error) {
            console.error('Error deleting contact:', error);
            showToast('Failed to delete contact', 'error');
          }
        }
      });

      contactsList.appendChild(contactItem);
    });
  } catch (error) {
    console.error('Error loading contacts:', error);
    showToast('Failed to load contacts', 'error');
  }
};

// ===== NEWSLETTER TAB =====
const setupNewsletterTab = (): void => {
  // Newsletter tab just loads data
};

const loadNewsletterSubscribers = async (): Promise<void> => {
  try {
    const subscribers = await newsletterAPI.getAll();
    const subscribersList = getElementById('newsletter-list');
    clearElement(subscribersList);

    if (subscribers.length === 0) {
      subscribersList.innerHTML =
        '<p style="text-align: center; padding: 2rem; color: #666;">No newsletter subscribers yet.</p>';
      return;
    }

    subscribers.forEach((subscriber: NewsletterSubscriber) => {
      const subscriberItem = document.createElement('div');
      subscriberItem.className = 'list-item';
      subscriberItem.innerHTML = `
        <div class="item-details">
          <p><strong>Email:</strong> ${subscriber.email}</p>
          <p><strong>Date:</strong> ${new Date(subscriber.createdAt).toLocaleDateString()}</p>
        </div>
        <button class="btn btn-danger delete-btn" data-id="${subscriber._id}">Remove</button>
      `;

      const deleteBtn = subscriberItem.querySelector('.delete-btn') as HTMLButtonElement;
      addEventListener(deleteBtn, 'click', async () => {
        if (confirm('Are you sure you want to remove this subscriber?')) {
          try {
            await newsletterAPI.unsubscribe(subscriber._id);
            showToast('Subscriber removed successfully!', 'success');
            await loadNewsletterSubscribers();
          } catch (error) {
            console.error('Error removing subscriber:', error);
            showToast('Failed to remove subscriber', 'error');
          }
        }
      });

      subscribersList.appendChild(subscriberItem);
    });
  } catch (error) {
    console.error('Error loading newsletter subscribers:', error);
    showToast('Failed to load subscribers', 'error');
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAdminPanel);
} else {
  initAdminPanel();
}
