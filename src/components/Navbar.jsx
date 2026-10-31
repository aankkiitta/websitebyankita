import { useEffect, useState } from "react";
import "./Navbar.css";

// Abhi ke liye nav items yahan hardcode kar rahe hain
const nav = ["home", "about", "stack", "services", "projects", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  // Scroll spy to highlight active section
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    
    // Thoda delay taaki DOM load ho jaye
    setTimeout(() => {
      nav.forEach((id) => { 
        const el = document.getElementById(id); 
        el && io.observe(el); 
      });
    }, 100);

    return () => io.disconnect();
  }, []);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <header className="nav-header">
      <nav className="navbar-pill" aria-label="Main">
        {/* Desktop Links */}
        <div className="nav-links-desktop">
          {nav.map((id) => (
            <a 
              key={id} 
              href={`#${id}`} 
              className={active === id ? "active" : ""}
            >
              {id}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="nav-mobile-toggle" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div className={`nav-mobile-menu ${isOpen ? "open" : ""}`}>
        {nav.map((id) => (
          <a 
            key={id} 
            href={`#${id}`} 
            className={active === id ? "active" : ""}
            onClick={handleLinkClick}
          >
            {id}
          </a>
        ))}
      </div>
    </header>
  );
}