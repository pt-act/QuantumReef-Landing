import {
  Navigation,
  Hero,
  Features,
  Comparison,
  HowItWorks,
  Testimonials,
  Subscribe,
  FAQ,
  Download,
  Footer,
  ScrollIndicator,
} from "@/components/marketing";
import { HorizontalScrollWrapper } from "@/components/HorizontalScrollWrapper";
import { UnderwaterBackground } from "@/components/UnderwaterBackground";

export default function Home() {
  return (
    <>
      <UnderwaterBackground />
      <Navigation />
      <ScrollIndicator />
      <HorizontalScrollWrapper>
        <section className="horizontal-scroll-section">
          <Hero />
        </section>
        <section className="horizontal-scroll-section">
          <Features />
        </section>
        <section className="horizontal-scroll-section">
          <Comparison />
        </section>
        <section className="horizontal-scroll-section">
          <HowItWorks />
        </section>
        <section className="horizontal-scroll-section">
          <Testimonials />
        </section>
        <section className="horizontal-scroll-section">
          <FAQ />
        </section>
        <section className="horizontal-scroll-section">
          <Download />
        </section>
        <section className="horizontal-scroll-section">
          <Subscribe />
          <Footer />
        </section>
      </HorizontalScrollWrapper>
    </>
  );
}
