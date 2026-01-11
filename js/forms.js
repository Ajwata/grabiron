// Form validation and submission

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean}
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validate phone format (basic)
 * @param {string} phone - Phone number
 * @returns {boolean}
 */
function validatePhone(phone) {
  const re = /^[\d\s\-\+\(\)]+$/;
  return phone.length >= 10 && re.test(phone);
}

/**
 * Show field error
 * @param {HTMLElement} field - Input field
 * @param {string} message - Error message
 */
function showError(field, message) {
  const formGroup = field.closest('.form-group');
  if (formGroup) {
    formGroup.classList.add('error');
    const errorMsg = formGroup.querySelector('.error-message');
    if (errorMsg) {
      errorMsg.textContent = message;
    }
  }
}

/**
 * Clear field error
 * @param {HTMLElement} field - Input field
 */
function clearError(field) {
  const formGroup = field.closest('.form-group');
  if (formGroup) {
    formGroup.classList.remove('error');
  }
}

/**
 * Validate form field
 * @param {HTMLElement} field - Input field
 * @returns {boolean}
 */
function validateField(field) {
  const value = field.value.trim();
  const name = field.name;
  
  clearError(field);
  
  // Required fields
  if (field.hasAttribute('required') && !value) {
    showError(field, 'This field is required');
    return false;
  }
  
  // Email validation
  if (name === 'email' && value && !validateEmail(value)) {
    showError(field, 'Please enter a valid email address');
    return false;
  }
  
  // Phone validation
  if (name === 'phone' && value && !validatePhone(value)) {
    showError(field, 'Please enter a valid phone number');
    return false;
  }
  
  return true;
}

/**
 * Validate entire form
 * @param {HTMLFormElement} form - Form element
 * @returns {boolean}
 */
function validateForm(form) {
  let isValid = true;
  
  const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
  fields.forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });
  
  return isValid;
}

/**
 * Show success message
 * @param {HTMLElement} container - Container element
 * @param {string} message - Success message
 */
function showSuccess(container, message) {
  let successEl = container.querySelector('.success-message');
  
  if (!successEl) {
    successEl = document.createElement('div');
    successEl.className = 'success-message';
    container.insertBefore(successEl, container.firstChild);
  }
  
  successEl.textContent = message;
  successEl.classList.add('active');
  
  setTimeout(() => {
    successEl.classList.remove('active');
  }, 5000);
}

/**
 * Handle form submission
 * @param {Event} e - Submit event
 */
async function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  
  if (!validateForm(form)) {
    return;
  }
  
  // Collect form data
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  
  // Mock submission - log to console
  console.log('Form submitted:', data);
  
  // Simulate API call
  try {
    // In a real application, you would send data to a server
    // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });
    
    // Show success message
    showSuccess(form.parentElement, 'Thank you! Your message has been sent successfully.');
    
    // Reset form
    form.reset();
    
    // Clear any remaining errors
    form.querySelectorAll('.form-group').forEach(group => {
      group.classList.remove('error');
    });
    
  } catch (error) {
    console.error('Form submission error:', error);
    alert('An error occurred. Please try again later.');
  }
}

/**
 * Setup form validation
 * @param {string} formSelector - Form CSS selector
 */
export function setupForm(formSelector) {
  const form = document.querySelector(formSelector);
  
  if (!form) return;
  
  // Add error message elements
  form.querySelectorAll('.form-group').forEach(group => {
    if (!group.querySelector('.error-message')) {
      const errorMsg = document.createElement('div');
      errorMsg.className = 'error-message';
      group.appendChild(errorMsg);
    }
  });
  
  // Validate on blur
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    
    // Clear error on input
    field.addEventListener('input', () => {
      if (field.closest('.form-group').classList.contains('error')) {
        clearError(field);
      }
    });
  });
  
  // Handle submit
  form.addEventListener('submit', handleFormSubmit);
}

/**
 * Initialize all forms on page
 */
export function initForms() {
  const forms = document.querySelectorAll('form.contact-form, form.mini-contact-form');
  forms.forEach(form => {
    setupForm(`#${form.id}, .${form.className.split(' ')[0]}`);
  });
}
