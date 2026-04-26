import './globals.css';

export const metadata = {
  title: 'Real Korean Cosmetic BD | Authentic K-Beauty in Bangladesh',
  description: 'Shop authentic Korean skincare & cosmetics in Bangladesh. 100% genuine products sourced directly from Seoul. Fast delivery, bKash/Nagad accepted.',
  keywords: 'Korean cosmetics Bangladesh, K-beauty BD, Korean skincare, COSRX Bangladesh, Innisfree Bangladesh',
  openGraph: {
    title: 'Real Korean Cosmetic BD',
    description: 'Authentic Korean skincare & cosmetics in Bangladesh',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#e91e8c" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
