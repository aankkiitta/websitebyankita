import Float, { useSectionProgress } from "./Float"; // Import Float
import "./Education.css";
import { Sphere } from "./HeroShapes"; 

// Simple SVG Icons
const IconPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconCalendar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const EDUCATION_DATA = [
  {
    year: "2026 – Present",
    degree: "Master of Computer Applications (MCA)",
    institution: "Lovely Professional University (LPU)",
    location: "Punjab, India",
    desc: "Focusing on Full Stack Web Development, DSA, and modern web technologies.",
  },
  {
    year: "2023 – 2026",
    degree: "B.Sc in Information Technology",
    institution: "S.I.A. College (University of Mumbai)",
    location: "Mumbai, India",
    desc: "Built a strong foundation in programming, networking, and databases.",
    cgpa: "8.90",
  }
];

export default function Education() {
  const { ref: sectionRef, progress } = useSectionProgress(); // Get section progress

  return (
    <section className="edu-section" id="education" ref={sectionRef}>
      <div className="edu-container">
        
        <h2 className="edu-title">
          <Float progress={progress} y={-25} bob={0.2}>Education</Float>
        </h2>

        <div className="edu-stack">
          {EDUCATION_DATA.map((item, index) => {
            // Shape position alternate karega (top-left, then bottom-right)
            const pos = index % 2 === 0 ? "tl" : "br"; 
            
            // Alternate float directions for the cards (left drifts left, right drifts right)
            const cardX = index % 2 === 0 ? -10 : 10;
            const cardY = index % 2 === 0 ? -20 : -35;

            return (
              <div className="edu-card-wrap" key={index} style={{ "--i": index }}>
                
                {/* 3D Shape Background */}
                <div className={`edu-decor edu-d-${pos}`} aria-hidden="true">
                  <span className="edu-float">
                    <Float progress={progress} y={pos === "tl" ? 30 : -30} x={pos === "tl" ? 15 : -15} bob={pos === "tl" ? 0.6 : 1.2}>
                      <Sphere />
                    </Float>
                  </span>
                </div>

                {/* Card Content - Wrapped in Float for subtle drift */}
                <Float progress={progress} x={cardX} y={cardY} bob={index * 0.4}>
                  <div className="edu-ring">
                    <div className="edu-card">
                      
                      {/* Top Row: Year & CGPA */}
                      <div className="edu-top-row">
                        <div className="edu-year">
                          <IconCalendar />
                          <span>{item.year}</span>
                        </div>
                        {item.cgpa && (
                          <div className="edu-cgpa-badge">
                            <span className="edu-cgpa-label">CGPA</span>
                            <span className="edu-cgpa-value">{item.cgpa}</span>
                          </div>
                        )}
                      </div>

                      {/* Degree Info */}
                      <h3 className="edu-degree">{item.degree}</h3>
                      
                      {/* Institution & Location */}
                      <div className="edu-meta">
                        <div className="edu-meta-item">
                          <IconPin />
                          <span>{item.institution}</span>
                        </div>
                        <div className="edu-meta-item">
                          <IconPin />
                          <span>{item.location}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="edu-desc">{item.desc}</p>

                    </div>
                  </div>
                </Float>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}