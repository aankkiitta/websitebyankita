import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Pyramid, Cylinder, LimeCube, YellowCube, Sphere, Star } from "./HeroShapes";
import "./OurServices.css";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "Website Design & Development",
    text: "Transform your vision into a reality. This service encompasses crafting beautiful and user-friendly websites that not only captivate visitors but also guide them towards specific actions, whether it's making a purchase, signing up for a newsletter, or contacting you. Our process involves in-depth understanding of your target audience, user experience (UX) design to ensure intuitive navigation and clear calls to action, and front-end development utilizing the latest web technologies to create a visually stunning and functional website.",
    Shape: Pyramid,
  },
  {
    title: "Landing Page Design",
    text: "Landing pages are laser-focused on specific marketing goals. We design high-impact landing pages that grab attention, communicate your value proposition clearly, and seamlessly convert visitors into leads or paying customers. From crafting compelling headlines and captivating visuals to optimizing conversion elements like CTAs (calls to action) and lead capture forms, we ensure your landing page delivers a powerful first impression and drives results.",
    Shape: Cylinder,
  },
  {
    title: "E-commerce Design",
    text: "Your online store should be a seamless shopping experience. We create user-friendly and visually appealing e-commerce websites that not only showcase your products beautifully but also make it easy for customers to browse, find what they're looking for, and complete their purchases effortlessly. We incorporate clear product information, intuitive navigation, secure payment gateways, and a streamlined checkout process to maximize sales conversions.",
    Shape: LimeCube,
  },
  {
    title: "SEO Optimization",
    text: "Get found by your target audience in search results. We incorporate basic SEO (Search Engine Optimization) best practices to improve your website's ranking in search engine results pages (SERPs) for relevant keywords. This helps potential customers discover your website organically, increasing website traffic and generating leads.",
    Shape: YellowCube,
  },
  {
    title: "Responsive Design",
    text: "Your website needs to look great and function flawlessly across all devices, from desktop computers to tablets and smartphones. Our responsive design approach ensures your website adapts automatically to different screen sizes, delivering an optimal user experience for all visitors, regardless of their device.",
    Shape: Sphere,
  },
  {
    title: "Website Maintenance & Support",
    text: "Your website is an ongoing investment. We provide ongoing website maintenance and support services to ensure your website stays up-to-date, secure against potential threats, and functions smoothly. This includes regular software updates, security scans, performance monitoring, and troubleshooting any technical issues that may arise.",
    Shape: Star,
  },
];

export default function OurServices() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const itemRefs = useRef([]);
  const [active, setActive] = useState(0);

  // Desktop only: GSAP pins the left box (number + title).
  // On mobile there is no pinned header, every service carries its own number + title.
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 901px)", () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 120px", // just under the navbar
        end: "bottom bottom",
        pin: leftRef.current,
        pinSpacing: false,
        anticipatePin: 1,
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

  // Reveal text + shape when item enters viewport
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
          }
        }),
      { threshold: 0.2 }
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // Track active service on scroll
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      let current = 0;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        
        if (r.top <= vh * 0.5 && r.bottom >= vh * 0.1) {
          current = i;
        }

        if (!reduce && r.bottom > -100 && r.top < vh + 100) {
          const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
          el.style.setProperty("--p", p.toFixed(4));
        }
      });
      setActive(current);
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

  const currentService = SERVICES[active];

  return (
    <section className="svc-section" id="services" ref={sectionRef}>
      {/* LEFT: GSAP Pinned Box (Number & Title change dynamically inside it) */}
      <div className="svc__left" ref={leftRef}>
        <div className="svc__sticky-box">
          <div className="svc__header-group">
            <div className="svc__num-crop" aria-hidden="true">
              <span className="svc__num" key={active}>
                {String(active + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="svc__title" key={`title-${active}`}>
              {currentService.title}
            </h3>
          </div>
        </div>
      </div>

      {/* RIGHT: Scrolling Content */}
      <div className="svc__right">
        {SERVICES.map(({ title, text, Shape }, i) => (
          <article
            key={title}
            className="svc__item"
            ref={(el) => (itemRefs.current[i] = el)}
          >
            {/* mobile only: half number + title that scroll up together with the paragraph */}
            <div className="svc__head" aria-hidden="true">
              <div className="svc__num-crop">
                <span className="svc__num">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="svc__title">{title}</h3>
            </div>
            <p className="svc__text">{text}</p>
            <div className="svc__shape-wrap">
              <div className="svc__shape-move">
                <div className="svc__shape" style={{ "--d": `${i * 0.5}s` }}>
                  <Shape />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}