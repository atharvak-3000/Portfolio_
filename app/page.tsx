import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative bg-[#F8F7F4]">
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <About />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
}
