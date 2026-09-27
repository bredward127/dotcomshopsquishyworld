import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <Header />

      <main id="main" className="flex-1">
        {children}
      </main>

      <Footer />
    </>
  );
}
