import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Float, { useSectionProgress } from "./Float"; // Import Float & hook
import "./Testimonials.css";

const TESTIMONIALS = [
  const testimonials = [
  {
    id: 1,
    name: "Sudharshan Infra",
    role: "REAL ESTATE & CONSTRUCTION",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=150&q=80",
    quote: "Working with the team was a great experience. They understood our business requirements and transformed our vision into a professional, modern website. The design, responsiveness, and overall experience exceeded our expectations."
  },
  {
    id: 2,
    name: "Photography Studio",
    role: "PHOTOGRAPHY & CREATIVE",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    quote: "The website beautifully showcases our photography work. The layout is clean, visually appealing, and easy to navigate. The entire process was smooth, and the final result perfectly represents our creative vision."
  },
  {
    id: 3,
    name: "AVANA",
    role: "DIGITAL & WEB SOLUTIONS",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    quote: "AVANA delivered an excellent digital experience with a modern design and smooth functionality. Their attention to detail, creative approach, and commitment to quality made the entire project a great experience."
  }
];
];

const Arrow = ({ flip }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: flip ? "rotate(180deg)" : "none" }} aria-hidden="true">
    <path d="M15 19L8 12L15 5" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const { ref: sectionRef, progress } = useSectionProgress(); // Get section progress

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  // Auto-play every 6 seconds (timer restarts whenever the slide changes)
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const current = TESTIMONIALS[currentIndex];

  return (
    /* The <section> itself stays plain, solid white and untransformed, so it can slide over
       the About section like a curtain. Only the content inside fades in. */
    <section className="testimonials-section" ref={sectionRef}>
      <motion.div
        className="tm-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="tm-title">
          <Float progress={progress} y={-30} bob={0.2}>Kind words from Clients</Float>
        </h2>

        <div className="tm-slider-wrapper">
          <button className="tm-nav-btn tm-nav-left" onClick={prevSlide} aria-label="Previous">
            <Arrow />
          </button>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="tm-content"
            >
              
              <Float progress={progress} y={-20} x={10} bob={0.5}>
                <div className="tm-image-wrapper">
                  <img src={current.image} alt={current.name} className="tm-image" />
                </div>
              </Float>

              <Float progress={progress} y={10} bob={1}>
                {/* Wrap the name and role to keep text centered while floating */}
                <div style={{ textAlign: "center" }}>
                  <h3 className="tm-name">{current.name}</h3>
                  <p className="tm-role">{current.role}</p>
                </div>
              </Float>

              <Float progress={progress} y={-15} bob={1.5}>
                <p className="tm-quote">"{current.quote}"</p>
              </Float>

            </motion.div>
          </AnimatePresence>

          <button className="tm-nav-btn tm-nav-right" onClick={nextSlide} aria-label="Next">
            <Arrow flip />
          </button>
        </div>

        <div className="tm-mobile-controls">
          <button className="tm-nav-btn-mobile" onClick={prevSlide} aria-label="Previous">
            <Arrow />
          </button>

          <div className="tm-dots">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                className={`tm-dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button className="tm-nav-btn-mobile" onClick={nextSlide} aria-label="Next">
            <Arrow flip />
          </button>
        </div>
      </motion.div>
    </section>
  );
}