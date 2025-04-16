/**
 * Load and render components on the page
 */
function loadComponents() {
  // Automatically detect if we're at root path or in subdirectory
  const isRootPath = !window.location.pathname.includes('/pages/');
  const pathPrefix = isRootPath ? './' : '../';
  
  // Find component containers
  const headerContainer = document.getElementById('header-container');
  const footerContainer = document.getElementById('footer-container');
  
  // Render components if containers exist and rendering functions are available
  if (headerContainer && window.renderHeader) {
    headerContainer.innerHTML = renderHeader(isRootPath);
  }
  
  if (footerContainer && window.renderFooter) {
    footerContainer.innerHTML = renderFooter(isRootPath);
  }
  
  // Apply constants to links if they exist
  if (window.APP_CONSTANTS) {
    // Helper function to update elements by ID if they exist
    const updateElementHref = (id, url, defaultUrl) => {
      const element = document.getElementById(id);
      if (element) element.href = url || defaultUrl || '#';
    };
    
    // Update logo link
    updateElementHref('main-logo-link', APP_CONSTANTS.WEBSITE_URL, isRootPath ? './' : '../');
    
    // Update app links
    updateElementHref('google-play-header', APP_CONSTANTS.ANDROID_APP);
    updateElementHref('appstore-header', APP_CONSTANTS.IOS_APP);
    
    // Update other navigation links
    const tutorialsPath = isRootPath ? APP_CONSTANTS.TUTORIALS_PAGE : APP_CONSTANTS.TUTORIALS_PAGE.replace('pages/', '');
    const termsPath = isRootPath ? APP_CONSTANTS.TERMS_PAGE : APP_CONSTANTS.TERMS_PAGE.replace('pages/', '');
    const privacyPath = isRootPath ? APP_CONSTANTS.PRIVACY_PAGE : APP_CONSTANTS.PRIVACY_PAGE.replace('pages/', '');
    
    updateElementHref('tutorials-link', tutorialsPath);
    updateElementHref('tutorials-header-link', tutorialsPath);
    updateElementHref('terms-link', termsPath);
    updateElementHref('privacy-link', privacyPath);
    
    // Update CTA links
    updateElementHref('google-play-cta', APP_CONSTANTS.ANDROID_APP);
    updateElementHref('appstore-cta', APP_CONSTANTS.IOS_APP);
    
    // Update article links
    updateElementHref('invoice-app-link', APP_CONSTANTS.INVOICE_APP_PAGE);
    updateElementHref('invoice-receipt-link', APP_CONSTANTS.INVOICE_RECEIPT_PAGE);
  }
  
  // Additional check to ensure footer is inserted if not already present
  if (footerContainer && !footerContainer.querySelector('footer') && window.renderFooter) {
    console.log('Ensuring footer is inserted');
    footerContainer.innerHTML = renderFooter(isRootPath);
  }
}

// Make the function globally available
if (typeof window !== 'undefined') {
  window.loadComponents = loadComponents;
  
  // Function to explicitly insert footer
  window.insertFooter = function() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer && window.renderFooter) {
      const isRootPath = !window.location.pathname.includes('/pages/');
      footerContainer.innerHTML = renderFooter(isRootPath);
    }
  };
  
  // Run as soon as possible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
  } else {
    loadComponents();
  }
}
