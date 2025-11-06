import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Team from "./components/Team";
import About from "./components/About";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="text-slate-900 bg-white">
      <Navbar />

      {/* Sections */}
      <section id="home"><Hero /></section>
      <section id="projects"><Projects /></section>
      <section id="services"><Services /></section>
      <section id="team"><Team /></section>
      <section id="about"><About /></section>
      <section id="why-us"><WhyChooseUs /></section>
      <section id="testimonials"><Testimonials /></section>
      <section id="faq"><FAQ /></section>
      <section id="contact"><Contact /></section>

      <Footer />
    </div>
  );
}