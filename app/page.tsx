import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SocialProof from "../components/SocialProof";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import AskDoctor from "../components/AskDoctor";
import Dashboard from "../components/Dashboard";
import Multilingual from "../components/Multilingual";
import LiveDemo from "../components/LiveDemo";
import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <HowItWorks />
        <Features />
        <AskDoctor />
        <Dashboard />
        <Multilingual />
        <LiveDemo />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
