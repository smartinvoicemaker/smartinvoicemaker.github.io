/**
 * Main site JavaScript - ensures all components load properly
 */

// Helper function to check for component elements
function ensureComponentsLoaded() {
  // Wait for constants to be available
  if (!window.APP_CONSTANTS) {
    setTimeout(ensureComponentsLoaded, 100);
    return;
  }
  
  // Check if header exists, if not, insert it
  let header = document.querySelector('header');
  if (!header) {
    if (typeof window.insertHeader === 'function') {
      window.insertHeader();
    } else {
      // Fallback if insertHeader is not available
      const headerContainer = document.getElementById('header-container') || 
        document.createElement('div');
      
      if (!document.getElementById('header-container')) {
        headerContainer.id = 'header-container';
        document.body.insertBefore(headerContainer, document.body.firstChild);
      }
      
      if (typeof window.renderHeader === 'function') {
        const isRootPath = !window.location.pathname.includes('/pages/');
        headerContainer.innerHTML = window.renderHeader(isRootPath);
      }
    }
  }
  
  // Check if footer exists, if not, insert it
  let footer = document.querySelector('footer');
  if (!footer) {
    if (typeof window.insertFooter === 'function') {
      window.insertFooter();
    } else {
      // Fallback if insertFooter is not available
      const footerContainer = document.getElementById('footer-container') || 
        document.createElement('div');
      
      if (!document.getElementById('footer-container')) {
        footerContainer.id = 'footer-container';
        document.body.appendChild(footerContainer);
      }
      
      if (typeof window.renderFooter === 'function') {
        const isRootPath = !window.location.pathname.includes('/pages/');
        footerContainer.innerHTML = window.renderFooter(isRootPath);
      }
    }
  }
  
  // Update links
  if (typeof window.loadComponents === 'function') {
    window.loadComponents();
  }
}

// Ensure components are loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ensureComponentsLoaded);
} else {
  ensureComponentsLoaded();
}

// Add an extra check after window load
window.addEventListener('load', function() {
  setTimeout(ensureComponentsLoaded, 100);
});
