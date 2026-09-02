import Section from "./Section.jsx";
import { repos } from "../data/repos.js";

export default function ExploreTheCode() {
  return (
    <Section title="Explore the code">
      <div className="repos">
        {repos.map((repo) => (
          <div className="repo" key={repo.url}>
            <div className="repo__left">
              <span className="repo__tag">{repo.tag}</span>
              <div className="repo__meta">
                <p className="repo__name">{repo.name}</p>
                <p className="repo__description">{repo.description}</p>
              </div>
            </div>
            <a
              className="btn btn--ghost"
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${repo.name} on GitHub`}
            >
              <img className="icon-14" src="/assets/github.svg" alt="" />
              GitHub
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}
