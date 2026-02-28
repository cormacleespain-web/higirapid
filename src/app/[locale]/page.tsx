import { Hero } from "@/components/home/hero";
import { TrustIndicators } from "@/components/home/trust-indicators";
import { ServicesOverview } from "@/components/home/services-overview";
import { PopularServices } from "@/components/home/popular-services";
import { WhyHigirap } from "@/components/home/why-higirap";
import { Testimonials } from "@/components/home/testimonials";
import { CtaBanner } from "@/components/home/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustIndicators />
      <ServicesOverview />
      <PopularServices />
      <WhyHigirap />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
