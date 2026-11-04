import { useEffect, useRef } from "react";
import Float, { useSectionProgress } from "./Float";
import "./Project.css";

// ---- Project images (directly from src/assets) ----
import avanaImg from "../assets/avana.png";
import photographyImg from "../assets/photography.png"; // 👈 UPDATE THIS EXACT FILENAME
import restaurantImg from "../assets/restaurant.png";
import girlImg from "../assets/girl.png";
import image1Img from "../assets/image1.png";
// ----------------------------------------------------

const PROJECTS = [
  { 
    type: "Freelancer Portfolio", 
    name: "Avana", 
    url: "https://avanaaa.com/", 
    image: avanaImg, 
    from: "#fdeee4", 
    to: "#f6c9b3" 
  },
  { 
    type: "Photography Portfolio", 
    name: "Photography", 
    url: "https://photography-six-teal.vercel.app/", 
    image: photographyImg, 
    from: "#1b1030", 
    to: "#b4532a" 
  },
  { 
    type: "Restaurant Website", 
    name: "Restaurant", 
    url: "https://restaurant-gules-sigma-23.vercel.app/", 
    image: restaurantImg, 
    from: "#2b2f33", 
    to: "#6c7a5e" 
  },
 
 
];

const MIN_SCALE = 0.8;
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

export default function Projects() {
  const itemRefs = useRef([]);
  const { ref: sectionRef, progress } = useSectionProgress();

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;

      items.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        const p = reduce ? 1 : clamp((vh * 0.95 - top) / (vh * 0.4), 0, 1);
        
        el.style.setProperty("--s", (MIN_SCALE + (1 - MIN_SCALE) * p).toFixed(3));
        el.style.setProperty("--o", (0.3 + 0.7 * p).toFixed(3)); 
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const onMove = (e) => {
    const box = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - box.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - box.top}px`);
  };

  return (
    <section className="pj" id="projects" ref={sectionRef}>
      <h2 className="pj__title">
        <Float progress={progress} y={-30} bob={0.2}>Projects</Float>
      </h2>

      <ul className="pj__grid">
        {PROJECTS.map((p, i) => (
          <li key={p.name} className="pj__item" ref={(el) => (itemRefs.current[i] = el)}>
            <Float progress={progress} x={i % 2 === 0 ? -20 : 20} y={i % 2 === 0 ? -30 : -40} bob={i * 0.3}>
              <div className="pj__float" style={{ "--fd": `${i * -0.9}s` }}>
                <a className="pj__card" href={p.url} target="_blank" rel="noopener noreferrer">
                  <div className="pj__ring">
                    <div className="pj__media" onMouseMove={onMove}>
                      {p.image ? (
                        <img className="pj__img" src={p.image} alt={`${p.name} preview`} loading="lazy" />
                      ) : (
                        <div className="pj__img pj__img--ph" style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }}>
                          <span>{p.name}</span>
                        </div>
                      )}
                      <span className="pj__shade" aria-hidden="true" />
                      <span className="pj__pill" aria-hidden="true">
                        View Project
                        <span className="pj__arrow">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="pj__meta">
                    <span className="pj__type">{p.type}</span>
                    <h3 className="pj__name">{p.name}</h3>
                  </div>
                </a>
              </div>
            </Float>
          </li>
        ))}
      </ul>
    </section>
  );
}