/**
 * Load and render components on the page
 */
function loadComponents() {
  // Find component containers
  const headerContainer = document.getElementById('header-container');
  const footerContainer = document.getElementById('footer-container');
  
  // Render components if containers exist and rendering functions are available
  if (headerContainer && window.renderHeader) {
    headerContainer.innerHTML = renderHeader();
    console.log('Header rendered');
    
    // Initialize mobile menu after header is rendered
    if (typeof initMobileMenu === 'function') {
      initMobileMenu();
    }
  }
  
  if (footerContainer && window.renderFooter) {
    footerContainer.innerHTML = renderFooter();
    console.log('Footer rendered');
  }
  
  // Apply constants to links if they exist
  if (window.APP_CONSTANTS) {
    // Helper function to update elements by ID if they exist
    const updateElementHref = (id, url, defaultUrl) => {
      const element = document.getElementById(id);
      if (element) element.href = url || defaultUrl || '#';
    };
    
    // Update logo link
    updateElementHref('main-logo-link', APP_CONSTANTS.WEBSITE_URL, './');
    
    // Update app links - desktop
    updateElementHref('google-play-header', APP_CONSTANTS.ANDROID_APP);
    updateElementHref('appstore-header', APP_CONSTANTS.IOS_APP);
    
    // Update app links - mobile
    updateElementHref('google-play-mobile', APP_CONSTANTS.ANDROID_APP);
    updateElementHref('appstore-mobile', APP_CONSTANTS.IOS_APP);
    
    // Update navigation links with correct paths - desktop
    updateElementHref('tutorials-header-link', APP_CONSTANTS.TUTORIALS_PAGE || './tutorials.html');
    updateElementHref('terms-header-link', APP_CONSTANTS.TERMS_PAGE || './terms.html');
    updateElementHref('privacy-header-link', APP_CONSTANTS.PRIVACY_PAGE || './privacy.html');
    
    // Update navigation links with correct paths - mobile
    updateElementHref('tutorials-mobile-link', APP_CONSTANTS.TUTORIALS_PAGE || './tutorials.html');
    updateElementHref('terms-mobile-link', APP_CONSTANTS.TERMS_PAGE || './terms.html');
    updateElementHref('privacy-mobile-link', APP_CONSTANTS.PRIVACY_PAGE || './privacy.html');
    
    // Update footer links
    updateElementHref('tutorials-link', APP_CONSTANTS.TUTORIALS_PAGE || './tutorials.html');
    updateElementHref('terms-link', APP_CONSTANTS.TERMS_PAGE || './terms.html');
    updateElementHref('privacy-link', APP_CONSTANTS.PRIVACY_PAGE || './privacy.html');
    
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
