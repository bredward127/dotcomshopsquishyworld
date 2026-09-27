import { Fredoka, Nunito } from 'next/font/google';
import FunnelHeader from '@/components/quiz/FunnelHeader';
import FunnelFooter from '@/components/quiz/FunnelFooter';

const display = Fredoka({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Nunito({ subsets: ['latin'], weight: ['400', '600', '700', '800'], variable: '--font-body' });

/** SquishyWorld funnel chrome: its own header, footer, fonts, and cream palette. */
export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${body.variable} flex flex-1 flex-col bg-cream font-body text-plum`}>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <FunnelHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <FunnelFooter />
    </div>
  );
}
