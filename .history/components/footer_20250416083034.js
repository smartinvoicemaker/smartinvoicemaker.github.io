/**
 * Renders the common footer for all pages
 * @param {boolean} isRootPath - Whether the current page is at the root path or in a subdirectory
 * @returns {string} HTML content for the footer
 */
function renderFooter(isRootPath = false) {
  // Determine correct path prefix for assets and links
  const pathPrefix = isRootPath ? './' : '../';
  
  // Create the footer HTML
  const footerHTML = `
    <footer class="bg-[#1c2431] py-12 text-blue-50">
      <div class="container mx-auto px-6 md:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between md:space-y-0 space-y-6">
          <div class="flex items-center space-x-4 md:space-x-6 my-4">
            <a href="${pathPrefix}tutorials.html" class="text-lGreen hover:text-lGreen transition duration-150 ease-in text-sm md:text-base px-3" id="tutorials-link">Tutorials</a>
            <a href="${pathPrefix}terms.html" class="text-lGreen hover:text-lGreen transition duration-150 ease-in text-sm md:text-base px-3" id="terms-link">Terms</a>
            <a href="${pathPrefix}privacy.html" class="text-lGreen hover:text-lGreen transition duration-150 ease-in text-sm md:text-base px-3" id="privacy-link">Privacy Policy</a>
          </div>
          <p class="text-gray-400 text-sm mt-6 md:mt-0 py-3">
            © ezInvoice. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  `;
  return footerHTML;
}

// Make the component available globally
if (typeof window !== 'undefined') {
  window.renderFooter = renderFooter;
}

// Create a function to insert the footer
function insertFooter() {
  // Don't insert if already handled by component-loader
  if (document.getElementById('footer-container')) {
    // If footer-container exists but is empty, fill it
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer.innerHTML.trim() === '') {
      const isRootPath = window.location.pathname === '/' || window.location.pathname.endsWith('index.html') || !window.location.pathname.includes('/');
      footerContainer.innerHTML = renderFooter(isRootPath);
    }
    return;
  }

  // Create and insert the footer directly
  const isRootPath = window.location.pathname === '/' || window.location.pathname.endsWith('index.html') || !window.location.pathname.includes('/');
  const footerElement = document.createElement('div');
  footerElement.innerHTML = renderFooter(isRootPath);
  
  document.body.appendChild(footerElement.firstElementChild);
  
  // Apply constant URLs if available
  if (window.APP_CONSTANTS) {
    const tutorialsLink = document.getElementById('tutorials-link');
    const termsLink = document.getElementById('terms-link');
    const privacyLink = document.getElementById('privacy-link');
    
    if (tutorialsLink) {
      tutorialsLink.href = isRootPath ? './tutorials.html' : '../tutorials.html';
    }
    
    if (termsLink) {
      termsLink.href = isRootPath ? './terms.html' : '../terms.html';
    }
    
    if (privacyLink) {
      privacyLink.href = isRootPath ? './privacy.html' : '../privacy.html';
    }
  }
}

// More reliable DOM ready handling
function ensureFooterInserted() {
  // If body exists, we can insert the footer
  if (document.body) {
    insertFooter();
  } else {
    // If body doesn't exist yet, wait a bit and try again
    setTimeout(ensureFooterInserted, 100);
  }
}

// Use a more comprehensive approach to ensure the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ensureFooterInserted);
} else {
  ensureFooterInserted();
}

// Add a fallback to ensure the footer appears even if other events fail
window.addEventListener('load', function() {
  // Double check if footer exists, if not insert it
  if (!document.querySelector('footer')) {
    insertFooter();
  }
});
