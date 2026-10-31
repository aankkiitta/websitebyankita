import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Pyramid, Star, Sphere, LimeCube, Cylinder, YellowCube } from "./HeroShapes";
import "./Hero.css";
import profilePhoto from '../assets/image1.png' 
/*
  Scroll parallax per shape (values are the extra movement after 900px of scroll):
    y = extra vertical px, x = sideways drift px, r = extra rotation (deg), s = scale change
  Top shapes drift DOWN (they lag behind the page), bottom shapes drift UP,
  so the shapes seem to float at different depths. Scrolling back up reverses it.
*/
const SHAPES = [
  { cls: "s1", Comp: Pyramid,    y: 120,  x: -60, r: -35, s: 0.1 },
  { cls: "s2", Comp: Star,       y: 180,  x: 70,  r: 40,  s: 0.15 },
  { cls: "s3", Comp: Sphere,     y: -60,  x: -40, r: 25,  s: 0.1 },
  { cls: "s4", Comp: LimeCube,   y: -90,  x: 50,  r: -45, s: 0.12 },
  { cls: "s5", Comp: Cylinder,   y: -170, x: -30, r: 30,  s: 0.15 },
  { cls: "s6", Comp: YellowCube, y: -130, x: 40,  r: -35, s: 0.1 },
];

const SPRING = { stiffness: 90, damping: 22, mass: 0.7 }; // soft, floaty follow

function FloatingShape({ cls, Comp, y, x, r, s, index, scrollY, amp }) {
  const RANGE = [0, 900];
  const ty = useSpring(useTransform(scrollY, RANGE, [0, y * amp]), SPRING);
  const tx = useSpring(useTransform(scrollY, RANGE, [0, x * amp]), SPRING);
  const rot = useSpring(useTransform(scrollY, RANGE, [0, r * amp]), SPRING);
  const sc = useSpring(useTransform(scrollY, RANGE, [1, 1 + s * amp]), SPRING);

  return (
    // layer 1: pop-in on load      (framer)
    // layer 2: idle up/down float  (CSS, see .hx-shape)
    // layer 3: scroll parallax     (framer, .hx-par)
    <motion.span
      className={`hx-shape hx-${cls}`}
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.3 + index * 0.08 }}
    >
      <motion.span className="hx-par" style={{ x: tx, y: ty, rotate: rot, scale: sc }}>
        <span className="hx-rot"><Comp /></span>
      </motion.span>
    </motion.span>
  );
}

/* Same scroll float for the text blocks: heading + words drift up, counter + button lag behind. */
const FLOATS = {
  heading: { y: -70, x: -25, r: 0, bob: 0 },
  word:    { y: -50, x: 20,  r: 0, bob: 0.6 },
  clients: { y: 60,  x: -25, r: 0, bob: 1.2 },
  cta:     { y: 100, x: 30,  r: 3, bob: 1.8 },
};

function FloatItem({ y, x, r, bob, scrollY, amp, children }) {
  const RANGE = [0, 900];
  const ty = useSpring(useTransform(scrollY, RANGE, [0, y * amp]), SPRING);
  const tx = useSpring(useTransform(scrollY, RANGE, [0, x * amp]), SPRING);
  const rot = useSpring(useTransform(scrollY, RANGE, [0, r * amp]), SPRING);
  return (
    // outer = scroll float (framer transform), CSS "translate" bob runs on top of it
    <motion.div className="hx-fl" style={{ x: tx, y: ty, rotate: rot }}>
      <div className="hx-bob" style={{ animationDelay: `${-bob}s` }}>{children}</div>
    </motion.div>
  );
}
export default function Hero({
  name = "Ankita",
  bgText = "WEB WITH ANKITA",
  words = ["FULL STACK DEVELOPER", "REACT.JS", "NODE.JS", "EXPRESS.JS", "MYSQL"],
  photo = profilePhoto,               // <-- ab imported image use hogi
  clients = "3 Projects Built",
  cta = "Let's Work Together!",
  ctaHref = "#contact",
})  {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, [words.length]);

  // no scroll movement if the visitor asked for reduced motion, gentler on phones
  const amp = reduce ? 0 : typeof window !== "undefined" && window.innerWidth < 800 ? 0.5 : 1;

  const row = Array.from({ length: 4 }, (_, k) => <span key={k}>{bgText}&nbsp;&nbsp;&nbsp;</span>);

  return (
    <header id="home" className="hx">
      <div className="hx-marquee" aria-hidden="true">
        <div className="hx-track">{row}{row}</div>
      </div>

      <div className="hx-stage" aria-hidden="true">
        {SHAPES.map((shape, index) => (
          <FloatingShape key={shape.cls} {...shape} index={index} scrollY={scrollY} amp={amp} />
        ))}
      </div>

      <div className="hx-content">
        <FloatItem {...FLOATS.heading} scrollY={scrollY} amp={amp}>
          <motion.h1 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            Hi, I'm <em>{name}</em>!
          </motion.h1>
        </FloatItem>

        <FloatItem {...FLOATS.word} scrollY={scrollY} amp={amp}>
          <div className="hx-word" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.span key={words[i]} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }} transition={{ duration: 0.3 }}>
                {words[i]}
              </motion.span>
            </AnimatePresence>
          </div>
        </FloatItem>

        <motion.div className="hx-photo" initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.9, delay: 0.2 }}
          whileHover={{ scale: 1.03 }}>
          <div className="hx-photo-in">
            <img src={photo} alt={name} onError={(e) => (e.currentTarget.style.visibility = "hidden")} />
          </div>
        </motion.div>

        <FloatItem {...FLOATS.clients} scrollY={scrollY} amp={amp}>
          <div className="hx-clients">
            <span className="hx-avatars">
              {["#bfe8c9", "#f7bfd0", "#c6ecd0"].map((c, k) => <b key={k} style={{ background: c }} />)}
            </span>
            {clients}
          </div>
        </FloatItem>

        <FloatItem {...FLOATS.cta} scrollY={scrollY} amp={amp}>
          <motion.a className="hx-cta" href={ctaHref} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            {cta}
          </motion.a>
        </FloatItem>
      </div>
    </header>
  );
}