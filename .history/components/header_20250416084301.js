/**
 * Renders the common header for all pages
 * @returns {string} HTML content for the header
 */
function renderHeader() {
  // Create the header HTML with direct paths since all pages are at the same level
  const headerHTML = `
    <header class="bg-white fixed top-0 w-full z-50 shadow-sm">
      <nav class="container mx-auto py-3">
        <div class="flex items-center justify-between px-4 md:px-6">
          <a href="./" class="flex items-center" id="main-logo-link">
            <img src="./images/logo.png" alt="ezInvoice" class="h-10" width="60" height="50" id="header-logo" />
          </a>
          <div class="flex items-center">
            <a href="./tutorials.html" class="mr-6 text-dBlue hover:text-lGreen transition duration-150 ease-in hidden md:block" id="tutorials-header-link">Tutorials</a>
            <a href="./terms.html" class="mr-6 text-dBlue hover:text-lGreen transition duration-150 ease-in hidden md:block" id="terms-header-link">Terms</a>
            <a href="./privacy.html" class="mr-6 text-dBlue hover:text-lGreen transition duration-150 ease-in hidden md:block" id="privacy-header-link">Privacy</a>
            <div class="flex items-center space-x-4">
              <a href="#" class="transition hover:opacity-80" id="google-play-header">
                <img src="./images/goolge-play.svg" alt="GooglePlay" id="google-play-img">
              </a>
              <a href="#" class="transition hover:opacity-80" id="appstore-header">
                <img src="./images/apple-store.svg" alt="AppStore" id="appstore-img">
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
      headerContainer.innerHTML = renderHeader();
    }
    return;
  }

  // Create and insert the header directly
  const headerElement = document.createElement('div');
  headerElement.innerHTML = renderHeader();
  
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
    
    if (mainLogoLink) mainLogoLink.href = APP_CONSTANTS.WEBSITE_URL || './';
    if (googlePlayHeader) googlePlayHeader.href = APP_CONSTANTS.ANDROID_APP || '#';
    if (appstoreHeader) appstoreHeader.href = APP_CONSTANTS.IOS_APP || '#';
  }
}

// Use a more reliable way to ensure the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', insertHeader);
} else {
  insertHeader();
}
