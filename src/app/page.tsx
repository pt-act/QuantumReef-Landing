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
import { UnderwaterBackground } from "@/components/UnderwaterBackground";

export default function Home() {
  return (
    <main data-design-id="main-page">
      <UnderwaterBackground />
      <Navigation />
      <ScrollIndicator />
      <Hero />
      <Features />
      <Comparison />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Download />
      <Subscribe />
      <Footer />
    </main>
  );
}
