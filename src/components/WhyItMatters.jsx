import { useState } from "react";

import Section from "./Section.jsx";
import { whyItMattersOptions } from "../data/whyItMatters.js";

export default function WhyItMatters() {
  const [activeId, setActiveId] = useState(whyItMattersOptions[0].id);
  const active = whyItMattersOptions.find((option) => option.id === activeId);

  return (
    <Section title="Why this matters">
      <div className="segmented" role="tablist" aria-label="WebMCP comparison">
        {whyItMattersOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={option.id === activeId}
            aria-controls="why-panel"
            className="segmented__option"
            data-active={option.id === activeId}
            onClick={() => setActiveId(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="panel" id="why-panel" role="tabpanel">
        <span className="panel__icon" data-tone={active.tone}>
          <img src={active.icon} alt="" />
        </span>
        <div className="panel__stack">
          <h3 className="panel__title">{active.title}</h3>
          <p className="panel__body">{active.body}</p>
        </div>
      </div>
    </Section>
  );
}
