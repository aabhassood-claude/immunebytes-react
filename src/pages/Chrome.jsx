import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AuditLeaderboardPage, ClientelePage, AboutPage, EngagementPage, PricingCalculatorPage, BlogPage, ContactPage } from '../components/ChromePages';

// Wrapper that adds Header + Footer around each chrome page
function ChromeLayout({ children, activePath }) {
  return (
    <div className="min-h-screen bg-black">
      <Header activePath={activePath} />
      <div className="pt-[72px]">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export function AuditPage() {
  return <ChromeLayout activePath="/audits"><AuditLeaderboardPage /></ChromeLayout>;
}

export function ClientPage() {
  return <ChromeLayout activePath="/clients"><ClientelePage /></ChromeLayout>;
}

export function AboutPageRoute() {
  return <ChromeLayout activePath="/about"><AboutPage /></ChromeLayout>;
}

export function EngagementPageRoute() {
  return <ChromeLayout activePath="/engagement-models"><EngagementPage /></ChromeLayout>;
}

export function PricingPageRoute() {
  return <ChromeLayout activePath="/pricing"><PricingCalculatorPage /></ChromeLayout>;
}

export function BlogPageRoute() {
  return <ChromeLayout activePath="/blogs"><BlogPage /></ChromeLayout>;
}

export function ContactPageRoute() {
  return <ChromeLayout activePath="/contact"><ContactPage /></ChromeLayout>;
}
