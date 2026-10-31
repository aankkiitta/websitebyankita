import "./WavyBanner.css";
import art from '../assets/girl.png';

const TEXT = "let’s build something great together";

export default function WavyBanner() {
  return (
    <section className="wb-section" aria-label="Intro">
      {/* girl image: full width of the section */}
      <img className="wb-art" src={art} alt="Illustration of a girl working on a laptop" />

      {/* wavy text sits on the left, over the image */}
      <div className="wb-text">
        <svg className="wb-wave" viewBox="0 0 640 230" role="img" aria-label={TEXT}>
          <defs>
            <path
              id="wb-path"
              d="M 10 120 C 90 30, 170 30, 250 120 S 410 210, 490 120 S 600 50, 640 80"
            />
          </defs>
          <text className="wb-wave-text">
            <textPath href="#wb-path" startOffset="0">
              {TEXT}
            </textPath>
          </text>
        </svg>

        {/* small floating icons around the text */}
        <span className="wb-icon wb-i1" aria-hidden="true">✦</span>
        <span className="wb-icon wb-i2" aria-hidden="true">💻</span>
        <span className="wb-icon wb-i3" aria-hidden="true">☕</span>
        <span className="wb-icon wb-i4" aria-hidden="true">✦</span>
      </div>
    </section>
  );
}