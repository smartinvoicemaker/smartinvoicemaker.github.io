document.addEventListener('DOMContentLoaded', function() {
  // Create the header element
  const header = document.createElement('header');
  header.className = 'bg-white fixed top-0 w-full z-50 shadow-sm';
  
  // Set the header content
  header.innerHTML = `
    <nav class="container mx-auto py-3">
      <div class="flex items-center justify-between px-4 md:px-6">
        <a href="#" class="flex items-center" id="main-logo-link">
          <img src="./images/logo.png" alt="ezInvoice" class="h-10" width="60" height="50" id="header-logo" />
        </a>
        <div class="flex items-center">
          <a href="./pages/tutorials.html" class="mr-6 text-dBlue hover:text-lGreen transition duration-150 ease-in hidden md:block">Tutorials</a>
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
  `;

  // Insert the header at the beginning of the body
  document.body.insertBefore(header, document.body.firstChild);
  
  // Apply constant URLs to header elements
  document.getElementById('main-logo-link').href = APP_CONSTANTS.WEBSITE_URL || '#';
  document.getElementById('google-play-header').href = APP_CONSTANTS.ANDROID_APP || '#';
  document.getElementById('appstore-header').href = APP_CONSTANTS.IOS_APP || '#';
  
  // Update tutorials link if available in constants
  const tutorialsLink = document.querySelector('a[href="./pages/tutorials.html"]');
  if (tutorialsLink && APP_CONSTANTS.TUTORIALS_PAGE) {
    tutorialsLink.href = APP_CONSTANTS.TUTORIALS_PAGE;
  }
  
  // Handle path corrections for nested pages
  const currentPath = window.location.pathname;
  if (currentPath.includes('/pages/')) {
    // Adjust image paths for nested pages
    document.getElementById('header-logo').src = "../images/logo.png";
    document.getElementById('google-play-img').src = "../images/goolge-play.svg";
    document.getElementById('appstore-img').src = "../images/apple-store.svg";
    
    // Adjust link paths
    const tutorialsLink = document.querySelector('header a[href="./pages/tutorials.html"]');
    if (tutorialsLink) {
      tutorialsLink.href = APP_CONSTANTS.TUTORIALS_PAGE || "./tutorials.html";
    }
  }
});
