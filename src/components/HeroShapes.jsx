// Soft, puffy "clay" 3D shapes as SVG (viewBox 200x200). Each fills its parent box.
const Grad = ({ id, a, b, radial = false }) =>
  radial ? (
    <radialGradient id={id} cx=".3" cy=".25" r=".9"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></radialGradient>
  ) : (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient>
  );

const Puffy = ({ id, blur = 7, k = 0.8 }) => (
  <filter id={id} x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
    <feGaussianBlur in="SourceAlpha" stdDeviation={blur} result="b" />
    <feSpecularLighting in="b" surfaceScale="7" specularConstant={k} specularExponent="24" lightingColor="#ffffff" result="s">
      <fePointLight x="35" y="-10" z="130" />
    </feSpecularLighting>
    <feComposite in="s" in2="SourceAlpha" operator="in" result="si" />
    <feComposite in="SourceGraphic" in2="si" operator="arithmetic" k1="0" k2="1" k3=".75" k4="0" />
  </filter>
);

const svgProps = { viewBox: "0 0 200 200", width: "100%", height: "100%", "aria-hidden": true };

export function Pyramid() {
  return (
    <svg {...svgProps}>
      <defs>
        <Grad id="py-l" a="#ffc68c" b="#ee5a26" />
        <Grad id="py-r" a="#ffb53a" b="#f7852b" />
        <Puffy id="py-f" />
      </defs>
      <g filter="url(#py-f)" strokeLinejoin="round" strokeWidth="20">
        <polygon points="108,28 24,118 96,168" fill="url(#py-l)" stroke="url(#py-l)" />
        <polygon points="108,28 96,168 178,134" fill="url(#py-r)" stroke="url(#py-r)" />
      </g>
    </svg>
  );
}

export function Star() {
  const pts = Array.from({ length: 10 }, (_, k) => {
    const a = -Math.PI / 2 + (k * Math.PI) / 5, r = k % 2 ? 36 : 60;
    return `${100 + r * Math.cos(a)},${104 + r * Math.sin(a)}`;
  }).join(" ");
  return (
    <svg {...svgProps}>
      <defs><Grad id="st" a="#e2fcff" b="#35a3b8" radial /><Puffy id="st-f" blur={8} /></defs>
      <polygon points={pts} fill="url(#st)" stroke="url(#st)" strokeWidth="36" strokeLinejoin="round" filter="url(#st-f)" />
    </svg>
  );
}

export function Sphere() {
  return (
    <svg {...svgProps}>
      <defs><Grad id="sp" a="#f8eaff" b="#6a3a9a" radial /><Puffy id="sp-f" blur={12} k={0.6} /></defs>
      <circle cx="100" cy="100" r="92" fill="url(#sp)" filter="url(#sp-f)" />
    </svg>
  );
}

function SoftCube({ id, base, side, topOp, sideOp, round }) {
  return (
    <svg {...svgProps}>
      <defs>
        <Grad id={`${id}g`} a={base[0]} b={base[1]} radial />
        <Puffy id={`${id}f`} blur={8} />
        <filter id={`${id}s`}><feGaussianBlur stdDeviation="2.5" /></filter>
      </defs>
      <g filter={`url(#${id}f)`}>
        <polygon points="100,34 164,68 164,134 100,168 36,134 36,68" fill={`url(#${id}g)`}
          stroke={`url(#${id}g)`} strokeWidth={round} strokeLinejoin="round" />
        <g filter={`url(#${id}s)`}>
          <polygon points="100,34 164,68 100,102 36,68" fill="#fff" opacity={topOp} />
          <polygon points="100,102 164,68 164,134 100,168" fill={side} opacity={sideOp} />
        </g>
      </g>
    </svg>
  );
}

export const LimeCube = () => (
  <SoftCube id="lc" base={["#e6ff7e", "#4f8a0c"]} side="#1d4a00" topOp={0.3} sideOp={0.22} round={34} />
);
export const YellowCube = () => (
  <SoftCube id="yc" base={["#ffe46e", "#ee8d1f"]} side="#b34a00" topOp={0.35} sideOp={0.28} round={22} />
);

export function Cylinder() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="cy-b" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#92cbf3" /><stop offset=".45" stopColor="#2f90e2" /><stop offset="1" stopColor="#1355ab" />
        </linearGradient>
        <Grad id="cy-t" a="#d9edff" b="#5fa9ea" radial />
        <Puffy id="cy-f" blur={7} />
      </defs>
      <g filter="url(#cy-f)">
        <path d="M38 58 V140 A62 26 0 0 0 162 140 V58 Z" fill="url(#cy-b)" />
        <ellipse cx="100" cy="58" rx="62" ry="26" fill="url(#cy-t)" />
      </g>
    </svg>
  );
}