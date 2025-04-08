/**
 * Renders the common header for all pages
 * @param {boolean} isRootPath - Whether the current page is at the root path or in a subdirectory
 * @returns {string} HTML content for the header
 */
function renderHeader(isRootPath = false) {
  // Determine correct path prefix for assets and links
  const pathPrefix = isRootPath ? './' : '../';
  
  // Create the header HTML
  const headerHTML = `
    <header class="bg-white fixed top-0 w-full z-50 shadow-sm">
      <nav class="container mx-auto py-3">
        <div class="flex items-center justify-between px-4 md:px-6">
          <a href="#" class="flex items-center" id="main-logo-link">
            <img src="${pathPrefix}images/logo.png" alt="ezInvoice" class="h-10" width="60" height="50" id="header-logo" />
          </a>
          <div class="flex items-center">
            <a href="${pathPrefix}pages/tutorials.html" class="mr-6 text-dBlue hover:text-lGreen transition duration-150 ease-in hidden md:block" id="tutorials-header-link">Tutorials</a>
            <div class="flex items-center space-x-4">
              <a href="#" class="transition hover:opacity-80" id="google-play-header">
                <img src="${pathPrefix}images/goolge-play.svg" alt="GooglePlay" id="google-play-img">
              </a>
              <a href="#" class="transition hover:opacity-80" id="appstore-header">
                <img src="${pathPrefix}images/apple-store.svg" alt="AppStore" id="appstore-img">
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `;
  
  return headerHTML;
}

// Make the component available globally
if (typeof window !== 'undefined') {
  window.renderHeader = renderHeader;
}

document.addEventListener('DOMContentLoaded', function() {
  // Check if header is already rendered by component-loader
  if (document.getElementById('header-container')) {
    return;
  }

  // Create the header element
  const header = document.createElement('div');
  
  // Set the header content using our function
  const isRootPath = !window.location.pathname.includes('/pages/');
  header.innerHTML = renderHeader(isRootPath);
  
  // Insert the header at the beginning of the body
  document.body.insertBefore(header.firstChild, document.body.firstChild);
  
  // Apply constant URLs to header elements if constants are available
  if (window.APP_CONSTANTS) {
    document.getElementById('main-logo-link').href = APP_CONSTANTS.WEBSITE_URL || (isRootPath ? './' : '../');
    document.getElementById('google-play-header').href = APP_CONSTANTS.ANDROID_APP || '#';
    document.getElementById('appstore-header').href = APP_CONSTANTS.IOS_APP || '#';
    
    const tutorialsLink = document.getElementById('tutorials-header-link');
    if (tutorialsLink && APP_CONSTANTS.TUTORIALS_PAGE) {
      tutorialsLink.href = isRootPath ? 
        APP_CONSTANTS.TUTORIALS_PAGE : 
        (APP_CONSTANTS.TUTORIALS_PAGE.replace('pages/', '') || './tutorials.html');
    }
  }
});
