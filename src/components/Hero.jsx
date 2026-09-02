import HeroGraphic from "./HeroGraphic.jsx";
import StatusStrip from "./StatusStrip.jsx";
import { site } from "../data/site.js";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__text">
        <h1 className="hero__headline">Your dashboard, ready for AI agents.</h1>
        <p className="hero__subtext">
          One script tag registers real tools in the browser, so any WebMCP agent can
          navigate, search, and query a dashboard directly. No API docs required.
        </p>
        <div className="hero__buttons">
          <a className="btn btn--solid" href="#try-it">
            Launch playground
          </a>
          <a
            className="btn btn--outline"
            href={site.specHref}
            target="_blank"
            rel="noreferrer"
          >
            View specification
          </a>
        </div>
        <StatusStrip />
      </div>
      <HeroGraphic />
    </section>
  );
}
