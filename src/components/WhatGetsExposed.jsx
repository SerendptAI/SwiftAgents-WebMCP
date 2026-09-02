import { useState } from "react";

import Section from "./Section.jsx";
import { exposureCards } from "../data/exposure.js";

function ExposureCard({ card }) {
  const [open, setOpen] = useState(false);
  const panelId = `exposure-${card.id}`;

  return (
    <div className="card" data-wide={card.wide === true}>
      <div className="card__body">
        <h3 className="card__title">{card.title}</h3>
        <p className="card__description">{card.description}</p>
        {open && (
          <ul className="card__tools" id={panelId}>
            {card.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        )}
      </div>
      <button
        type="button"
        className="card__toggle"
        data-open={open}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${open ? "Hide" : "Show"} tools for ${card.title}`}
        onClick={() => setOpen((value) => !value)}
      >
        <img src="/assets/plus.svg" alt="" />
      </button>
    </div>
  );
}

export default function WhatGetsExposed() {
  return (
    <Section
      title="What gets exposed"
      subtitle="Four capabilities, five tools, registered automatically."
    >
      <div className="card-grid">
        {exposureCards.map((card) => (
          <ExposureCard key={card.id} card={card} />
        ))}
      </div>
    </Section>
  );
}
