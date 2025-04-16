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
          
          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center">
            <a href="./tutorials.html" class="mr-6 text-dBlue hover:text-lGreen transition duration-150 ease-in" id="tutorials-header-link">Tutorials</a>
            <a href="./terms.html" class="mr-6 text-dBlue hover:text-lGreen transition duration-150 ease-in" id="terms-header-link">Terms</a>
            <a href="./privacy.html" class="mr-6 text-dBlue hover:text-lGreen transition duration-150 ease-in" id="privacy-header-link">Privacy</a>
            <div class="flex items-center space-x-4">
              <a href="#" class="transition hover:opacity-80" id="google-play-header">
                <img src="./images/goolge-play.svg" alt="GooglePlay" id="google-play-img">
              </a>
              <a href="#" class="transition hover:opacity-80" id="appstore-header">
                <img src="./images/apple-store.svg" alt="AppStore" id="appstore-img">
              </a>
            </div>
          </div>
          
          <!-- Mobile Menu Button -->
          <div class="md:hidden flex items-center">
            <button id="mobile-menu-button" class="text-dBlue focus:outline-none" aria-label="Toggle menu">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Mobile Menu (hidden by default) -->
        <div id="mobile-menu" class="hidden md:hidden py-4 px-4 bg-white border-t border-gray-200">
          <div class="flex flex-col space-y-3">
            <a href="./tutorials.html" class="text-dBlue hover:text-lGreen transition duration-150 ease-in py-2 border-b border-gray-100" id="tutorials-mobile-link">Tutorials</a>
            <a href="./terms.html" class="text-dBlue hover:text-lGreen transition duration-150 ease-in py-2 border-b border-gray-100" id="terms-mobile-link">Terms</a>
            <a href="./privacy.html" class="text-dBlue hover:text-lGreen transition duration-150 ease-in py-2 border-b border-gray-100" id="privacy-mobile-link">Privacy</a>
            <div class="flex items-center pt-2 space-x-4">
              <a href="#" class="transition hover:opacity-80 flex-1 text-center" id="google-play-mobile">
                <img src="./images/goolge-play.svg" alt="GooglePlay" class="h-10 inline-block">
              </a>
              <a href="#" class="transition hover:opacity-80 flex-1 text-center" id="appstore-mobile">
                <img src="./images/apple-store.svg" alt="AppStore" class="h-10 inline-block">
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
      initMobileMenu();
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
  
  // Initialize mobile menu toggle functionality
  initMobileMenu();
  
  // Apply constant URLs if available
  if (window.APP_CONSTANTS) {
    const mainLogoLink = document.getElementById('main-logo-link');
    const googlePlayHeader = document.getElementById('google-play-header');
    const appstoreHeader = document.getElementById('appstore-header');
    const googlePlayMobile = document.getElementById('google-play-mobile');
    const appstoreMobile = document.getElementById('appstore-mobile');
    
    if (mainLogoLink) mainLogoLink.href = APP_CONSTANTS.WEBSITE_URL || './';
    if (googlePlayHeader) googlePlayHeader.href = APP_CONSTANTS.ANDROID_APP || '#';
    if (appstoreHeader) appstoreHeader.href = APP_CONSTANTS.IOS_APP || '#';
    if (googlePlayMobile) googlePlayMobile.href = APP_CONSTANTS.ANDROID_APP || '#';
    if (appstoreMobile) appstoreMobile.href = APP_CONSTANTS.IOS_APP || '#';
  }
}

// Function to initialize mobile menu toggle functionality
function initMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', function() {
      // Toggle the mobile menu
      if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!menuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
        mobileMenu.classList.add('hidden');
      }
    });
  }
}

// Use a more reliable way to ensure the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', insertHeader);
} else {
  insertHeader();
}
