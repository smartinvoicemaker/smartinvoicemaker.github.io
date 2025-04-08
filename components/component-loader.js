/**
 * Load and render components on the page
 * @param {boolean} isRootPath - Whether the current page is at the root path or in a subdirectory
 */
function loadComponents(isRootPath = false) {
  // Render header and footer
  const headerContainer = document.getElementById('header-container');
  const footerContainer = document.getElementById('footer-container');
  
  if (headerContainer) {
    headerContainer.innerHTML = renderHeader(isRootPath);
  }
  
  if (footerContainer) {
    footerContainer.innerHTML = renderFooter(isRootPath);
  }
  
  // Apply constants to links if they exist
  document.addEventListener('DOMContentLoaded', function() {
    if (window.APP_CONSTANTS) {
      // Update logo link
      const mainLogoLink = document.getElementById('main-logo-link');
      if (mainLogoLink) {
        mainLogoLink.href = window.APP_CONSTANTS.WEBSITE_URL || (isRootPath ? './' : '../index.html');
      }
      
      // Update app store links in header
      const googlePlayHeader = document.getElementById('google-play-header');
      const appStoreHeader = document.getElementById('appstore-header');
      
      if (googlePlayHeader) googlePlayHeader.href = window.APP_CONSTANTS.ANDROID_APP;
      if (appStoreHeader) appStoreHeader.href = window.APP_CONSTANTS.IOS_APP;
      
      // Update footer links
      const termsLink = document.getElementById('terms-link');
      const privacyLink = document.getElementById('privacy-link');
      
      if (termsLink) termsLink.href = isRootPath ? APP_CONSTANTS.TERMS_PAGE : '../' + APP_CONSTANTS.TERMS_PAGE;
      if (privacyLink) privacyLink.href = isRootPath ? APP_CONSTANTS.PRIVACY_PAGE : '../' + APP_CONSTANTS.PRIVACY_PAGE;
      
      // Update tutorials link
      const tutorialsLinks = document.querySelectorAll('a[href$="tutorials.html"]');
      tutorialsLinks.forEach(link => {
        link.href = isRootPath ? APP_CONSTANTS.TUTORIALS_PAGE : '../' + APP_CONSTANTS.TUTORIALS_PAGE;
      });
    }
  });
}

// Make the function globally available
if (typeof window !== 'undefined') {
  window.loadComponents = loadComponents;
}
