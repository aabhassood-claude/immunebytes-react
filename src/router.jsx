import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import {
  AuditPage,
  ClientPage,
  AboutPageRoute,
  EngagementPageRoute,
  PricingPageRoute,
  BlogPageRoute,
  ContactPageRoute,
} from './pages/Chrome';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

export const router = createBrowserRouter([
  // Home
  { path: '/', element: <Home /> },

  // Solutions / Service pages — catch-all for nested service routes
  { path: '/solutions/*', element: <Services /> },

  // Chrome / top-level pages
  { path: '/audits', element: <AuditPage /> },
  { path: '/clients', element: <ClientPage /> },
  { path: '/about', element: <AboutPageRoute /> },
  { path: '/engagement-models', element: <EngagementPageRoute /> },
  { path: '/pricing', element: <PricingPageRoute /> },
  { path: '/pricing-calculator', element: <PricingPageRoute /> },
  { path: '/blogs', element: <BlogPageRoute /> },
  { path: '/contact', element: <ContactPageRoute /> },

  // Soft fallbacks
  { path: '/case-studies', element: <Home /> },
  { path: '/case-studies/*', element: <ClientPage /> },
  { path: '/careers', element: <AboutPageRoute /> },
  { path: '/legal/*', element: <Home /> },
], { basename });
