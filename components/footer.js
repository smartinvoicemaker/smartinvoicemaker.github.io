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
    <footer class="bg-[#1c2431] py-6 text-white">
      <div class="container mx-auto px-4 md:px-6">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="flex items-center space-x-4 md:space-x-8">
            <a href="${pathPrefix}pages/tutorials.html" class="text-white hover:text-lGreen transition duration-150 ease-in text-sm md:text-base" id="tutorials-link">Tutorials</a>
            <a href="${pathPrefix}pages/terms.html" class="text-white hover:text-lGreen transition duration-150 ease-in text-sm md:text-base" id="terms-link">Terms</a>
            <a href="${pathPrefix}pages/privacy.html" class="text-white hover:text-lGreen transition duration-150 ease-in text-sm md:text-base" id="privacy-link">Privacy Policy</a>
          </div>
          
          <p class="text-gray-400 text-sm mt-4 md:mt-0">
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

document.addEventListener('DOMContentLoaded', function() {
  // Check if footer is already rendered by component-loader
  if (document.getElementById('footer-container')) {
    return;
  }

  // Create the footer element
  const footer = document.createElement('footer');
  footer.className = 'bg-[#1c2431] py-6';
  
  // Set the footer content using the existing renderFooter function
  // This avoids code duplication
  const isRootPath = !window.location.pathname.includes('/pages/');
  footer.innerHTML = renderFooter(isRootPath).trim().replace(/<\/?footer[^>]*>/g, '');

  // Append the footer to the body
  document.body.appendChild(footer);

  // Apply constant URLs to footer links if constants are available
  if (window.APP_CONSTANTS) {
    const tutorialsLink = document.getElementById('tutorials-link');
    const termsLink = document.getElementById('terms-link');
    const privacyLink = document.getElementById('privacy-link');
    
    if (tutorialsLink) {
      tutorialsLink.href = isRootPath ? 
        (APP_CONSTANTS.TUTORIALS_PAGE || './pages/tutorials.html') : 
        (APP_CONSTANTS.TUTORIALS_PAGE || './tutorials.html');
    }
    
    if (termsLink) {
      termsLink.href = isRootPath ? 
        (APP_CONSTANTS.TERMS_PAGE || './pages/terms.html') : 
        (APP_CONSTANTS.TERMS_PAGE || './terms.html');
    }
    
    if (privacyLink) {
      privacyLink.href = isRootPath ? 
        (APP_CONSTANTS.PRIVACY_PAGE || './pages/privacy.html') : 
        (APP_CONSTANTS.PRIVACY_PAGE || './privacy.html');
    }
  }
});
