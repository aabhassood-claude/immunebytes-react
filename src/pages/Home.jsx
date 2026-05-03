import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { TrustedBy, Impact, Services, CaseStudies, Testimonials, Insights, CTA } from '../components/Sections';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header activePath="/" />
      <main>
        <Hero />
        <TrustedBy />
        <Impact />
        <Services />
        <CaseStudies />
        <Testimonials />
        <Insights />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
