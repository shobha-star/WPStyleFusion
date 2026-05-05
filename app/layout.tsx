import type {Metadata} from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: 'Style Fusion | Where Beauty Meets Innovation',
  description: 'Experience premium beauty services at Style Fusion Professional Ladies Salon.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`scroll-smooth ${playfair.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const desc = Object.getOwnPropertyDescriptor(window, 'fetch');
                if (desc && !desc.set) {
                  const originalFetch = window.fetch;
                  Object.defineProperty(window, 'fetch', {
                    configurable: true,
                    enumerable: true,
                    get: () => originalFetch,
                    set: (newFetch) => {
                      Object.defineProperty(window, 'fetch', {
                        value: newFetch,
                        configurable: true,
                        enumerable: true,
                        writable: true
                      });
                    }
                  });
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased text-indigo-start bg-pink-light" suppressHydrationWarning>{children}</body>
    </html>
  );
}
