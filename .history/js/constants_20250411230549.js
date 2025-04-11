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
    title: 'Creating Your First Invoice',
    description: 'Learn how to create your first invoice quickly and easily with ezInvoice in just a few simple steps.',
    youtubeId: '11a8RPN_cio',
    duration: '3:45',
    level: 'Beginner'
  },
  
  // Creating & Managing Invoices Section
  {
    id: 'excel-import',
    section: 'Creating & Managing Invoices',
    title: 'Importing Customers and Products from Excel',
    description: 'Learn how to quickly import your existing customer database and product catalog from Excel files to save time on manual data entry.',
    youtubeId: 'bCbB2etSPqA',
    duration: '5:24',
    level: 'Intermediate'
  },
  {
    id: 'excel-export',
    section: 'Creating & Managing Invoices',
    title: 'Exporting Business Data to Excel',
    description: 'Discover how to export your customers, products, and invoice data to Excel for backup purposes or further analysis in spreadsheet software.',
    youtubeId: '87P6RkC8HGk',
    duration: '4:18',
    level: 'Intermediate'
  },
  
  // Advanced Features Section
  {
    id: 'templates',
    section: 'Advanced Features',
    title: 'Customizing Invoice Templates',
    description: 'Learn how to customize invoice templates with your brand colors, logo, and personalized text to make your invoices stand out.',
    youtubeId: '6tfEowsr6wc',
    duration: '7:14',
    level: 'Advanced'
  },
  {
    id: 'reports',
    section: 'Advanced Features',
    title: 'Generating Reports and Analytics',
    description: 'Discover how to generate financial reports, analyze your sales data, and gain insights into your business performance.',
    youtubeId: '0w2aU7Omw5Y',
    duration: '8:05',
    level: 'Advanced'
  },
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
