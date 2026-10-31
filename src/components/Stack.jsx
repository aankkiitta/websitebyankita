import { useEffect, useRef, useState } from "react";
import "./Stack.css";

const CUBE = "https://framerusercontent.com/images/tLJlDufDxfRWX3e1UyLWQODdOaw.png?width=1024&height=1024";
const MIN_SCALE = 0.85;

const TOOLS = [
  { name: "React", c: "#2bb5d6", img: "https://framerusercontent.com/images/3Szln3ctlrMQ4ONG4UKb0tgNc.png", text: "React serves as the foundation for building dynamic web applications. I use it to create reusable UI components, manage complex state, and craft smooth client-side interactions." },
  { name: "GSAP", c: "#3f9d2e", img: "https://framerusercontent.com/images/LJXMMTS68CRtx2gDcT5upxXYmM.png", text: "GSAP powers the motion and animation layer of my sites. I use it to build silky scroll sequences, handle timeline-based transitions, and choreograph complex interactions." },
  { name: "Claude", c: "#d97757", img: "https://framerusercontent.com/images/i15EhHSHzluLJjZKmt2cGLUMYI.png", text: "Claude is my thinking partner throughout a project. I lean on it for structuring content, refining copy, and untangling tricky logic." },
  { name: "Framer", c: "#111111", img: "https://framerusercontent.com/images/iouKS2rbJjWhwous2oe7p7aLcxg.png", text: "Framer revolutionizes my web design workflow. It goes beyond a simple website builder, offering a visual playground where I can craft stunning and interactive websites." },
  { name: "Shopify", c: "#5a8f2a", img: "https://framerusercontent.com/images/XSZsh7kyKCqXDCzrSxuhC2rEK6s.png", text: "Shopify powers the commerce projects I build. I use it to manage products, inventory, and checkout, giving clients a dependable storefront backend." },
  { name: "WordPress", c: "#2f6fa8", img: "https://framerusercontent.com/images/y6PSEQQZ7u85XGwqvUuX7cMjizI.png", text: "WordPress serves as my trusted platform for content-heavy and editorial websites. I use it to build flexible CMS structures and empower clients with easy self-publishing tools." },
  { name: "ChatGPT", c: "#10a37f", img: "https://framerusercontent.com/images/JHQbDuOt3ld0sPBFQ05ZoNxxYo.png", text: "ChatGPT is my content generation and assistance tool. I leverage it for content ideas, copywriting, and problem-solving to enhance the quality of my projects." },
  { name: "Creative Cloud", c: "#da1f26", img: "https://framerusercontent.com/images/0jnTZZjdwduZRfwiVpKinU7HP0.png", text: "Adobe Creative Cloud is my comprehensive toolkit for unleashing creative potential. It offers a powerful suite of applications like Photoshop, Illustrator, and After Effects." },
  { name: "Slack", c: "#7b3fa0", img: "https://framerusercontent.com/images/wZZeyhwTuHqINd3ht6aQc4Qh9E.png", text: "Slack is the cornerstone of my collaborative workflow. It fosters a dynamic environment where teams can seamlessly exchange ideas, share files, and provide real-time feedback." },
];

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

function Logo({ tool }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="st-logo-wrapper">
      {failed ? (
        <span className="st-logo-letter" style={{ background: tool.c }} aria-hidden="true">
          {tool.name[0]}
        </span>
      ) : (
        <img className="st-logo" src={tool.img} alt="" loading="lazy" draggable="false" onError={() => setFailed(true)} />
      )}
    </span>
  );
}

function StackCard({ tool }) {
  const [flipped, setFlipped] = useState(false);
  const trackCursor = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <li className="st-item">
      <div className="st-ring">
        <button
          type="button"
          className={`st-card${flipped ? " is-flipped" : ""}`}
          aria-pressed={flipped}
          onClick={() => setFlipped((f) => !f)}
          onMouseMove={trackCursor}
        >
          <span className="st-card-inner">
            <span className="st-face st-front" aria-hidden={flipped}>
              <Logo tool={tool} />
              <span className="st-name">{tool.name}</span>
              <span className="st-hint">Tap to flip</span>
            </span>
            <span className="st-face st-back" aria-hidden={!flipped}>
              <span className="st-name">{tool.name}</span>
              <span className="st-text">{tool.text}</span>
              <span className="st-hint">Tap to flip</span>
            </span>
          </span>
          <span className="st-pill" aria-hidden="true">Tap to Flip</span>
        </button>
      </div>
    </li>
  );
}

export default function Stack() {
  const wrapRef = useRef(null);

  // Scroll Scaling Effect (Cards grow as they enter screen)
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const items = wrap.querySelectorAll(".st-item");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;

      items.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        const p = reduce ? 1 : clamp((vh * 0.95 - top) / (vh * 0.5), 0, 1);
        el.style.setProperty("--s", (MIN_SCALE + (1 - MIN_SCALE) * p).toFixed(3));
        el.style.setProperty("--o", (0.5 + 0.5 * p).toFixed(3));
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

  return (
    <section className="stack-section" id="stack" aria-labelledby="st-title">
      <div className="st-container">
        <h2 className="st-title" id="st-title">My Stack</h2>

        <div className="st-grid-wrap" ref={wrapRef}>
          {/* Background 3D Cube */}
          <div className="st-cube-wrap" aria-hidden="true">
            <img className="st-cube" src={CUBE} alt="" draggable="false" />
          </div>

          <ul className="st-grid">
            {TOOLS.map((tool, i) => (
              <div className="st-item-wrap" key={tool.name} style={{ "--i": i }}>
                <StackCard tool={tool} />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}