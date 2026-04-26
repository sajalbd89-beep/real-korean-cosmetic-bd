import './globals.css';

export const metadata = {
  title: 'Korean Cosmetics BD | Authentic K-Beauty Products in Bangladesh',
  description: 'Shop authentic Korean skincare & cosmetics. COSRX, Laneige, Innisfree, Some By Mi. 100% genuine K-beauty products directly from Korea.',
  keywords: 'Korean cosmetics Bangladesh, K-beauty BD, COSRX Bangladesh, Laneige BD, Korean skincare, K-beauty products',
  openGraph: {
    title: 'Korean Cosmetics BD',
    description: 'Authentic Korean beauty products in Bangladesh',
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
