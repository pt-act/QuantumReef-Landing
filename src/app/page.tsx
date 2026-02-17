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
} from "@/components/marketing";

export default function Home() {
  return (
    <main data-design-id="main-page">
      <Navigation />
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
