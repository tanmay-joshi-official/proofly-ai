import './globals.css';
import ClientLayout from '@/components/ClientLayout';

export const metadata = {
  title: 'Proofly AI - Trust Intelligence Engine',
  description: 'AI-powered content authenticity verification platform',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
