/**
 * Load and render components on the page
 */
function loadComponents() {
  // Automatically detect if we're at root path or in subdirectory
  const isRootPath = window.location.pathname === '/' || 
                     window.location.pathname.endsWith('index.html') || 
                     !window.location.pathname.includes('/');
                     
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
    
    // Update navigation links with correct paths
    const tutorialsPath = isRootPath ? './tutorials.html' : '../tutorials.html';
    const termsPath = isRootPath ? './terms.html' : '../terms.html';
    const privacyPath = isRootPath ? './privacy.html' : '../privacy.html';
    
    updateElementHref('tutorials-link', tutorialsPath);
    updateElementHref('tutorials-header-link', tutorialsPath);
    updateElementHref('terms-link', termsPath);
    updateElementHref('terms-header-link', termsPath);
    updateElementHref('privacy-link', privacyPath);
    updateElementHref('privacy-header-link', privacyPath);
    
    // Update CTA links
    updateElementHref('google-play-cta', APP_CONSTANTS.ANDROID_APP);
    updateElementHref('appstore-cta', APP_CONSTANTS.IOS_APP);
  }
}

// Make the function globally available
if (typeof window !== 'undefined') {
  window.loadComponents = loadComponents;
  
  // Run as soon as possible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
  } else {
    loadComponents();
  }
  
  // Also run on load as a fallback
  window.addEventListener('load', function() {
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');
    
    // If containers exist but are empty, fill them
    if (headerContainer && headerContainer.innerHTML.trim() === '') {
      loadComponents();
    }
    
    if (footerContainer && footerContainer.innerHTML.trim() === '') {
      loadComponents();
    }
  });
}
