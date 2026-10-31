import { motion, useSpring, useTransform, useReducedMotion, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import "./Float.css";

// Reusable hook to track progress relative to the section
export function useSectionProgress() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return { ref, progress: scrollYProgress };
}

export default function Float({
  children,
  progress,
  x = 0,
  y = 0,
  r = 0,
  s = 0,
  bob = 0,
  className = "",
}) {
  const reduce = useReducedMotion();
  const [factor, setFactor] = useState(1);

  // Halve amplitude on mobile (< 800px)
  useEffect(() => {
    const handleResize = () => setFactor(window.innerWidth < 800 ? 0.5 : 1);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Spring config for smooth follow
  const springConfig = { stiffness: 90, damping: 22, mass: 0.7 };
  const smoothProgress = useSpring(progress, springConfig);

  // Map progress (0 -> 1) to [0, value]
  const scrollX = useTransform(smoothProgress, [0, 1], [0, x * factor]);
  const scrollY = useTransform(smoothProgress, [0, 1], [0, y * factor]);
  const rotate = useTransform(smoothProgress, [0, 1], [0, r * factor]);
  const scale = useTransform(smoothProgress, [0, 1], [1, 1 + s * factor]);

  // Disable scroll movement on reduced motion
  const finalX = reduce ? 0 : scrollX;
  const finalY = reduce ? 0 : scrollY;
  const finalRotate = reduce ? 0 : rotate;
  const finalScale = reduce ? 1 : scale;

  return (
    <motion.div
      className={`float-wrapper ${className}`}
      style={{
        x: finalX,
        y: finalY,
        rotate: finalRotate,
        scale: finalScale,
        willChange: "transform",
        "--bob-delay": `${-Math.abs(bob)}s`, // negative delay so they start out of sync
      }}
    >
      <div className={reduce ? "" : "float-bob-inner"}>
        {children}
      </div>
    </motion.div>
  );
}