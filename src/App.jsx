import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Stack from "./components/Stack"; 
import OurServices from "./components/OurServices";
import Education from "./components/Education";
import Projects from "./components/Project";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ThankYou from "./components/ThankYou";
import WavyBanner from "./components/WavyBanner";
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Testimonials />
        <Stack /> 
        <OurServices/>
        <Education/>
        <Projects/>
        <WavyBanner/>
        <Contact/>
        <Footer/>
      </main>
    </>
  );
}