import Hero from "@/components/home/hero-section";
import HowItWorks from "@/components/home/how-it-works";
import Categories from "@/components/home/popular-gift-categories";
import OccasionsBanner from "@/components/home/special-occasions-banner";
import Testimonials from "@/components/home/testimonials";
import LiveChatbot from "@/components/live-chatbot";

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      {/*  <FeaturedGifts /> */}
      <HowItWorks />
      <Testimonials />
      <OccasionsBanner />
      {/* Other sections will go here */}
      <LiveChatbot />
    </main>
  );
}
