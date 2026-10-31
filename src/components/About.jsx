import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScroll } from "framer-motion";
import { Pyramid, Sphere } from "./HeroShapes";
import Float from "./Float";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  {
    id: 1,
    text: "I'm a Full Stack Web Developer with hands-on experience in building responsive and database-driven web applications. I work with React.js, JavaScript, Node.js, Express.js, and MySQL, turning ideas into functional and user-friendly digital experiences.",
  },
  {
    id: 2,
    text: "I enjoy working across both frontend and backend development. From creating modern interfaces and reusable components to developing REST APIs, managing databases, and implementing backend functionality, I focus on building websites that are responsive, reliable, and easy to use.",
  },
  {
    id: 3,
    text: "Through freelance work and projects like AVANA, I've gained practical experience in developing and deploying full-stack websites using modern technologies. I'm passionate about exploring new tools, improving my development skills, and creating meaningful digital experiences through technology and design.",
  },
];

export default function About() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);

  // Scroll progress for the floating animations
  const { scrollYProgress: progress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const wrap = containerRef.current;
    const mm = gsap.matchMedia();

    mm.add({ desktop: "(min-width: 769px)", mobile: "(max-width: 768px)" }, (ctx) => {
      const { mobile } = ctx.conditions;
      const titleTop = mobile ? 72 : 90; 
      const cardTop = mobile ? 190 : 240; 

      const cards = cardRefs.current.filter(Boolean);

      const releaseAt = () => {
        const tallest = Math.max(...cards.map((c) => c.offsetHeight));
        return `bottom ${cardTop + tallest + 80}px`;
      };
      const common = {
        endTrigger: wrap,
        end: releaseAt,
        invalidateOnRefresh: true,
        pin: true,
        pinSpacing: false,
      };

      // 1. Pin the "About Me" title
      ScrollTrigger.create({ trigger: titleRef.current, start: `top ${titleTop}px`, ...common });

      // 2. Pin every card; later cards stack on top of earlier ones
      cards.forEach((card, index) => {
        ScrollTrigger.create({ trigger: card, start: `top ${cardTop}px`, ...common });

        const next = cards[index + 1];
        if (next) {
          gsap.to(card.querySelector(".about-card-inner"), {
            scale: 0.94 - index * 0.02,
            opacity: 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: "top 85%",
              end: `top ${cardTop}px`,
              scrub: true,
            },
          });
        }
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return (
    <div ref={containerRef} id="about" className="about-page-wrapper">
      <section className="about-section">
        <div ref={titleRef} className="title-wrapper">
          <h1 className="main-title">
            {/* Float applied to the inner text of the title */}
            <Float progress={progress} y={-20} bob={0.2}>About Me</Float>
          </h1>
        </div>

        <div className="cards-stack-container">
          {cardsData.map((card, index) => (
            <div key={card.id} ref={(el) => (cardRefs.current[index] = el)} className="card-wrapper">
              <div className="about-card-container">
                
                <div className="accent-shape shape-top-left" aria-hidden="true">
                  {/* Float applied to the shape box inside the absolute container */}
                  <Float progress={progress} y={40} x={20} bob={0.5}>
                    <div className="shape-box"><Pyramid /></div>
                  </Float>
                </div>

                <div className="about-card-inner">
                  {/* Float applied to the paragraph, protected from the GSAP scale transform */}
                  <Float progress={progress} y={-10} bob={0.8}>
                    <p>{card.text}</p>
                  </Float>
                </div>

                <div className="accent-shape shape-bottom-right" aria-hidden="true">
                  <Float progress={progress} y={-30} x={-15} bob={1}>
                    <div className="shape-box"><Sphere /></div>
                  </Float>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}