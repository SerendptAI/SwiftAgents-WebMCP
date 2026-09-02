import HeroOrb from "./HeroOrb.jsx";

const orb = { left: 63.77, top: 71.13, size: 199.486 };

const shapes = [
  { src: "/assets/hero-dashed.svg", left: 291.87, top: 237.91, size: 71.128 },
  { src: "/assets/hero-robot.svg", left: 0, top: 45.78, size: 71.128 },
  { src: "/assets/hero-bookmark.svg", left: 263.26, top: 0, size: 57.23 },
  { src: "/assets/hero-bolt.svg", left: 35.97, top: 270.61, size: 65.405 },
];

function placement(shape) {
  return {
    left: `${shape.left}px`,
    top: `${shape.top}px`,
    width: `${shape.size}px`,
    height: `${shape.size}px`,
  };
}

export default function HeroGraphic() {
  return (
    <div className="hero__graphic" aria-hidden="true">
      <HeroOrb style={placement(orb)} />
      {shapes.map((shape) => (
        <img key={shape.src} src={shape.src} alt="" style={placement(shape)} />
      ))}
    </div>
  );
}
