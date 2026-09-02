import { useState } from "react";

import Section from "./Section.jsx";
import { defaultStepId, howItWorksSteps } from "../data/howItWorks.js";

export default function HowItWorks() {
  const [activeId, setActiveId] = useState(defaultStepId);
  const active = howItWorksSteps.find((step) => step.id === activeId);

  return (
    <Section title="How it works">
      <div className="steps" role="tablist" aria-label="How it works">
        {howItWorksSteps.map((step) => (
          <button
            key={step.id}
            type="button"
            role="tab"
            aria-selected={step.id === activeId}
            aria-controls="step-panel"
            aria-label={`Step ${step.id}: ${step.title}`}
            className="step"
            data-active={step.id === activeId}
            onClick={() => setActiveId(step.id)}
          >
            {step.id}
          </button>
        ))}
      </div>

      <div className="panel" id="step-panel" role="tabpanel">
        <div className="panel__stack">
          <h3 className="panel__title">{active.title}</h3>
          <p className="panel__body">{active.body}</p>
        </div>
      </div>
    </Section>
  );
}
