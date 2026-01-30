/**
 * DOM Utility Functions
 */

export const getElementById = (id: string): HTMLElement => {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Element with id "${id}" not found`);
  return element;
};

export const queryElement = <T extends HTMLElement>(
  selector: string,
  parent: Document | HTMLElement = document
): T => {
  const element = parent.querySelector<T>(selector);
  if (!element) throw new Error(`Element with selector "${selector}" not found`);
  return element;
};

export const queryAllElements = <T extends HTMLElement>(
  selector: string,
  parent: Document | HTMLElement = document
): NodeListOf<T> => {
  return parent.querySelectorAll<T>(selector);
};

export const showElement = (element: HTMLElement): void => {
  element.style.display = 'block';
};

export const hideElement = (element: HTMLElement): void => {
  element.style.display = 'none';
};

export const toggleElement = (element: HTMLElement): void => {
  element.style.display =
    element.style.display === 'none' ? 'block' : 'none';
};

export const addClass = (element: HTMLElement, className: string): void => {
  element.classList.add(className);
};

export const removeClass = (element: HTMLElement, className: string): void => {
  element.classList.remove(className);
};

export const hasClass = (element: HTMLElement, className: string): boolean => {
  return element.classList.contains(className);
};

export const setAttribute = (
  element: HTMLElement,
  attribute: string,
  value: string
): void => {
  element.setAttribute(attribute, value);
};

export const getAttribute = (
  element: HTMLElement,
  attribute: string
): string | null => {
  return element.getAttribute(attribute);
};

export const setTextContent = (element: HTMLElement, text: string): void => {
  element.textContent = text;
};

export const setHTML = (element: HTMLElement, html: string): void => {
  element.innerHTML = html;
};

export const clearElement = (element: HTMLElement): void => {
  element.innerHTML = '';
};

export const addEventListener = (
  element: HTMLElement,
  event: string,
  handler: EventListener
): void => {
  element.addEventListener(event, handler);
};

export const removeEventListener = (
  element: HTMLElement,
  event: string,
  handler: EventListener
): void => {
  element.removeEventListener(event, handler);
};

export const createFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (data[key] instanceof File) {
      formData.append(key, data[key]);
    } else if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key].toString());
    }
  });
  return formData;
};

export const showToast = (message: string, type: 'success' | 'error' = 'success'): void => {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
};
