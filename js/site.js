/**
 * Main site JavaScript - ensures all components load properly without duplication
 */

// Track loaded scripts to prevent duplicates
const loadedScripts = new Set();

// Function to dynamically load scripts
function loadScript(url) {
  if (loadedScripts.has(url)) {
    return Promise.resolve(); // Already loaded
  }
  
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => {
      loadedScripts.add(url);
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Load required component scripts in the correct order
async function loadComponents() {
  try {
    // Load component scripts in sequence to maintain dependency order
    await loadScript('./components/header.js');
    await loadScript('./components/footer.js');
    await loadScript('./components/component-loader.js');
    
    // Initialize components once all scripts are loaded
    initializeComponents();
  } catch (error) {
    console.error('Error loading component scripts:', error);
  }
}

// Function to initialize components
function initializeComponents() {
  // Helper function to check for component elements
  
  // Check if header exists, if not, insert it
  let header = document.querySelector('header');
  if (!header) {
    if (typeof window.insertHeader === 'function') {
      window.insertHeader();
    } else {
      // Fallback if insertHeader is not available
      const headerContainer = document.getElementById('header-container');
      if (headerContainer && typeof window.renderHeader === 'function') {
        headerContainer.innerHTML = window.renderHeader();
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
      const footerContainer = document.getElementById('footer-container');
      if (footerContainer && typeof window.renderFooter === 'function') {
        footerContainer.innerHTML = window.renderFooter();
      }
    }
  }
  
  // Update links if component-loader exists
  if (typeof window.loadComponents === 'function') {
    window.loadComponents();
  }
}

// Start loading components
document.addEventListener('DOMContentLoaded', loadComponents);
