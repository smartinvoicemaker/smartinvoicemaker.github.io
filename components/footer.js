/**
 * Renders the common footer for all pages
 * @param {boolean} isRootPath - Whether the current page is at the root path or in a subdirectory
 * @returns {string} HTML content for the footer
 */
function renderFooter(isRootPath = false) {
  // Determine correct path prefix for assets and links
  const pathPrefix = isRootPath ? './' : '../';
  
  // Create the footer HTML - using the same footer as in index.html
  const footerHTML = `
    <footer class="bg-[#1c2431] py-6 text-white">
      <div class="container mx-auto px-4 md:px-6">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="flex items-center space-x-4 md:space-x-8">
            <a href="${pathPrefix}pages/tutorials.html" class="text-white hover:text-lGreen transition duration-150 ease-in text-sm md:text-base">Tutorials</a>
            <a href="${pathPrefix}pages/terms.html" class="text-white hover:text-lGreen transition duration-150 ease-in text-sm md:text-base p-4" id="terms-link">Terms</a>
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
  // Create the footer element
  const footer = document.createElement('footer');
  footer.className = 'bg-[#1c2431] py-6';
  
  // Set the footer content
  footer.innerHTML = `
    <div class="container mx-auto px-4 md:px-6">
      <div class="flex flex-col md:flex-row items-center justify-between">
        <div class="flex items-center space-x-4 md:space-x-8">
          <a href="./pages/tutorials.html" class="text-white hover:text-lGreen transition duration-150 ease-in text-sm md:text-base p-4">Tutorials</a>
          <a href="./pages/terms.html" class="text-blue hover:text-lGreen transition duration-150 ease-in text-sm md:text-base p-4" id="terms-link">Terms</a>
          <a href="./pages/privacy.html" class="text-blue hover:text-lGreen transition duration-150 ease-in text-sm md:text-base" id="privacy-link">Privacy Policy</a>
        </div>
        
        <p class="text-[#9698a6] text-sm mt-4 md:mt-0">
          © ezInvoice. All Rights Reserved
        </p>
      </div>
    </div>
  `;

  // Append the footer to the body
  document.body.appendChild(footer);

  // Apply constant URLs to footer elements
  document.getElementById('terms-link').href = APP_CONSTANTS.TERMS_PAGE || './pages/terms.html';
  document.getElementById('privacy-link').href = APP_CONSTANTS.PRIVACY_PAGE || './pages/privacy.html';
  
  // Update tutorials link if available in constants
  const tutorialsLink = footer.querySelector('a[href="./pages/tutorials.html"]');
  if (tutorialsLink && APP_CONSTANTS.TUTORIALS_PAGE) {
    tutorialsLink.href = APP_CONSTANTS.TUTORIALS_PAGE;
  }
  
  // Handle path corrections for nested pages
  const currentPath = window.location.pathname;
  if (currentPath.includes('/pages/')) {
    // Adjust link paths for nested pages
    const tutorialsLink = footer.querySelector('a[href="./pages/tutorials.html"]');
    if (tutorialsLink) {
      tutorialsLink.href = APP_CONSTANTS.TUTORIALS_PAGE || "./tutorials.html";
    }
    
    const termsLink = document.getElementById('terms-link');
    if (termsLink) {
      termsLink.href = APP_CONSTANTS.TERMS_PAGE || "./terms.html";
    }
    
    const privacyLink = document.getElementById('privacy-link');
    if (privacyLink) {
      privacyLink.href = APP_CONSTANTS.PRIVACY_PAGE || "./privacy.html";
    }
  }
});
