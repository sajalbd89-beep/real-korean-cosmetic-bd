import './globals.css';

export const metadata = {
  title: 'Real Korean Cosmetic BD',
  description: 'Authentic Korean skincare & cosmetics in Bangladesh',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
