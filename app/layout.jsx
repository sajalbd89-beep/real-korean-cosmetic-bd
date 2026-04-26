import './globals.css';

export const metadata = {
  title: 'RKCBD Restaurant | Authentic Bangladeshi Cuisine in Dhaka',
  description: 'Order authentic Bangladeshi food online. Fresh halal ingredients, traditional recipes. Call 01046841561 for delivery.',
  keywords: 'Bangladeshi restaurant, Halal food Dhaka, Biryani delivery, Bengali cuisine, Traditional food Bangladesh',
  openGraph: {
    title: 'RKCBD Restaurant',
    description: 'Authentic Bangladeshi cuisine with fresh halal ingredients',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
