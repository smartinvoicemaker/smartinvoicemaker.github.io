/**
 * Load and render components on the page
 */
function loadComponents() {
  console.log('Running loadComponents function');
  
  // Find component containers
  const headerContainer = document.getElementById('header-container');
  const footerContainer = document.getElementById('footer-container');
  
  console.log('Found header container:', headerContainer !== null);
  console.log('Found footer container:', footerContainer !== null);
  
  // Render components if containers exist and rendering functions are available
  if (headerContainer && window.renderHeader) {
    console.log('Rendering header with renderHeader function');
    headerContainer.innerHTML = renderHeader();
    
    // Initialize mobile menu after header is rendered
    if (typeof initMobileMenu === 'function') {
      console.log('Initializing mobile menu');
      initMobileMenu();
    }
  } else {
    console.warn('Could not render header. Container or function missing:', {
      containerExists: headerContainer !== null,
      renderFunctionExists: typeof window.renderHeader === 'function'
    });
  }
  
  if (footerContainer && window.renderFooter) {
    console.log('Rendering footer with renderFooter function');
    footerContainer.innerHTML = renderFooter();
  } else {
    console.warn('Could not render footer. Container or function missing:', {
      containerExists: footerContainer !== null,
      renderFunctionExists: typeof window.renderFooter === 'function'
    });
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
    updateElementHref('contact-link', APP_CONSTANTS.CONTACT_PAGE || './contact.html');
    
    // Update footer app download links
    updateElementHref('google-play-footer', APP_CONSTANTS.ANDROID_APP);
    updateElementHref('appstore-footer', APP_CONSTANTS.IOS_APP);
    
    // Update CTA links
    updateElementHref('google-play-cta', APP_CONSTANTS.ANDROID_APP);
    updateElementHref('appstore-cta', APP_CONSTANTS.IOS_APP);
  }
  
  // Initialize any footer-specific JavaScript functionality if needed
  // N/A for current implementation
}

// Make the function globally available
if (typeof window !== 'undefined') {
  window.loadComponents = loadComponents;
  
  // Run as soon as possible
  if (document.readyState === 'loading') {
    console.log('Document still loading, adding DOMContentLoaded listener');
    document.addEventListener('DOMContentLoaded', function() {
      console.log('DOMContentLoaded fired, calling loadComponents');
      loadComponents();
    });
  } else {
    console.log('Document already loaded, calling loadComponents immediately');
    loadComponents();
  }
  
  // Also run on load as a fallback
  window.addEventListener('load', function() {
    console.log('Window load event fired');
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');
    
    // If containers exist but are empty, fill them
    if (headerContainer && headerContainer.innerHTML.trim() === '') {
      console.log('Header container found empty on load, calling loadComponents');
      loadComponents();
    }
    
    if (footerContainer && footerContainer.innerHTML.trim() === '') {
      console.log('Footer container found empty on load, calling loadComponents');
      loadComponents();
    }
  });
  
  // Add one more fallback to ensure components load even on slow connections
  setTimeout(function() {
    console.log('Timeout fallback check running');
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');
    
    if (headerContainer && headerContainer.innerHTML.trim() === '') {
      console.log('Header container still empty after timeout, calling loadComponents');
      loadComponents();
    }
    
    if (footerContainer && footerContainer.innerHTML.trim() === '') {
      console.log('Footer container still empty after timeout, calling loadComponents');
      loadComponents();
    }
  }, 1000);
}
