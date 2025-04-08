// Constants for shared links across the website
const APP_CONSTANTS = {
  // Main website URL
  WEBSITE_URL: 'https://ez-invoice.com/',
  
  // App download links
  ANDROID_APP: 'https://play.google.com/store/apps/details?id=invoice.invoicemaker.simple',
  IOS_APP: 'https://apps.apple.com/app/ezinvoice-easy-invoice-maker/id6478380167',
  
  // Page links
  TERMS_PAGE: 'pages/terms.html',
  PRIVACY_PAGE: 'pages/privacy.html',
  INVOICE_APP_PAGE: 'pages/best-invoice-app.html',
  INVOICE_RECEIPT_PAGE: 'pages/invoice-recipt.html',
  TUTORIALS_PAGE: 'pages/tutorials.html',
  
  // Image paths
  LOGO: './images/logo.png',
  GOOGLE_PLAY_BADGE: './images/goolge-play.svg',
  APPSTORE_BADGE: './images/apple-store.svg'
};

// Tutorial videos data
const TUTORIAL_VIDEOS = [
  // Getting Started Section
  {
    id: 'intro',
    section: 'Getting Started',
    title: 'Introduction to ezInvoice',
    description: 'Get familiar with the ezInvoice app interface and learn about its main features and benefits for your business.',
    youtubeId: 'b_Xz7lHt0Y8',
    duration: '3:45',
    level: 'Beginner'
  },
  {
    id: 'setup',
    section: 'Getting Started',
    title: 'Setting Up Your Business Profile',
    description: 'Learn how to set up your business profile with your logo, contact information, and payment details to create professional invoices.',
    youtubeId: 'IfHjdJaO5iQ',
    duration: '4:12',
    level: 'Beginner'
  },
  
  // Creating & Managing Invoices Section
  {
    id: 'first-invoice',
    section: 'Creating & Managing Invoices',
    title: 'Creating Your First Invoice',
    description: 'Step-by-step guide to creating a professional invoice, including adding items, setting quantities and prices, and applying taxes.',
    youtubeId: '9CVmrKbg3Kk',
    duration: '5:38',
    level: 'Beginner'
  },
  {
    id: 'customers',
    section: 'Creating & Managing Invoices',
    title: 'Managing Customers and Products',
    description: 'Learn how to create and manage your customer database and product catalog to streamline your invoice creation process.',
    youtubeId: 'JYT-LY9JZQ8',
    duration: '4:56',
    level: 'Intermediate'
  },
  {
    id: 'tracking',
    section: 'Creating & Managing Invoices',
    title: 'Invoice Tracking and Payment Status',
    description: 'Discover how to track invoice payments, mark invoices as paid, partially paid or overdue, and manage your cash flow effectively.',
    youtubeId: 'wHbGc2jTVTc',
    duration: '6:22',
    level: 'Intermediate'
  },
  
  // Advanced Features Section
  {
    id: 'templates',
    section: 'Advanced Features',
    title: 'Customizing Invoice Templates',
    description: 'Learn how to customize invoice templates with your brand colors, logo, and personalized text to make your invoices stand out.',
    youtubeId: 'xOHZT-ZOwgw',
    duration: '7:14',
    level: 'Advanced'
  },
  {
    id: 'reports',
    section: 'Advanced Features',
    title: 'Generating Reports and Analytics',
    description: 'Discover how to generate financial reports, analyze your sales data, and gain insights into your business performance.',
    youtubeId: 'M3SrVl7yZSs',
    duration: '8:05',
    level: 'Advanced'
  },
  {
    id: 'recurring',
    section: 'Advanced Features',
    title: 'Setting Up Recurring Invoices',
    description: 'Learn how to set up recurring invoices for regular clients, saving time and ensuring consistent billing for subscription-based services.',
    youtubeId: 'uCHZJm14Nng',
    duration: '5:47',
    level: 'Advanced'
  },
  
  // Tips and Tricks Section
  {
    id: 'time-saving',
    section: 'Tips and Tricks',
    title: 'Time-Saving Tips for Invoicing',
    description: 'Discover pro tips and shortcuts to speed up your invoicing workflow and save valuable time when managing your business finances.',
    youtubeId: 'pxiseXQRu5g',
    duration: '6:33',
    level: 'All Levels'
  },
  {
    id: 'best-practices',
    section: 'Tips and Tricks',
    title: 'Best Practices for Professional Invoicing',
    description: 'Learn professional invoicing etiquette and best practices to enhance your business image and improve your chances of getting paid promptly.',
    youtubeId: 'YGtQSJZ7-sk',
    duration: '7:18',
    level: 'All Levels'
  }
];

// Make constants available globally - using only one global variable to reduce pollution
if (typeof window !== 'undefined') {
  window.APP_CONSTANTS = APP_CONSTANTS;
  window.TUTORIAL_VIDEOS = TUTORIAL_VIDEOS;
  
  // Add helper to easily handle paths for both root and subdirectory pages
  window.getPath = function(path, isRootPath = !window.location.pathname.includes('/pages/')) {
    if (!path) return '#';
    return isRootPath ? path : path.replace('pages/', '');
  };
}
