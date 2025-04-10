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

// Create a function to insert the header
function insertHeader() {
  // Don't insert if already handled by component-loader
  if (document.getElementById('header-container')) {
    // If header-container exists but is empty, fill it
    const headerContainer = document.getElementById('header-container');
    if (headerContainer.innerHTML.trim() === '') {
      const isRootPath = !window.location.pathname.includes('/pages/');
      headerContainer.innerHTML = renderHeader(isRootPath);
    }
    return;
  }

  // Create and insert the header directly
  const isRootPath = !window.location.pathname.includes('/pages/');
  const headerElement = document.createElement('div');
  headerElement.innerHTML = renderHeader(isRootPath);
  
  if (document.body.firstChild) {
    document.body.insertBefore(headerElement.firstElementChild, document.body.firstChild);
  } else {
    document.body.appendChild(headerElement.firstElementChild);
  }
  
  // Apply constant URLs if available
  if (window.APP_CONSTANTS) {
    const mainLogoLink = document.getElementById('main-logo-link');
    const googlePlayHeader = document.getElementById('google-play-header');
    const appstoreHeader = document.getElementById('appstore-header');
    const tutorialsHeaderLink = document.getElementById('tutorials-header-link');
    
    if (mainLogoLink) mainLogoLink.href = APP_CONSTANTS.WEBSITE_URL || (isRootPath ? './' : '../');
    if (googlePlayHeader) googlePlayHeader.href = APP_CONSTANTS.ANDROID_APP || '#';
    if (appstoreHeader) appstoreHeader.href = APP_CONSTANTS.IOS_APP || '#';
    
    if (tutorialsHeaderLink && APP_CONSTANTS.TUTORIALS_PAGE) {
      tutorialsHeaderLink.href = isRootPath ? 
        APP_CONSTANTS.TUTORIALS_PAGE : 
        (APP_CONSTANTS.TUTORIALS_PAGE.replace('pages/', '') || './tutorials.html');
    }
  }
}

// Use a more reliable way to ensure the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', insertHeader);
} else {
  insertHeader();
}
