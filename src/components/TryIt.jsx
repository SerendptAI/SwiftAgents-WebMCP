import { useState } from "react";

import Section from "./Section.jsx";
import { defaultQuestionId, tryItQuestions } from "../data/tryIt.js";

export default function TryIt() {
  const [activeId, setActiveId] = useState(defaultQuestionId);
  const active = tryItQuestions.find((question) => question.id === activeId);

  return (
    <Section
      id="try-it"
      title="Try it"
      subtitle="Pick a question below. Watch which tool the agent calls and what comes back."
    >
      <div className="chips" role="tablist" aria-label="Example questions">
        {tryItQuestions.map((question) => (
          <button
            key={question.id}
            type="button"
            role="tab"
            aria-selected={question.id === activeId}
            aria-controls="try-it-terminal"
            className="chip"
            data-active={question.id === activeId}
            onClick={() => setActiveId(question.id)}
          >
            {question.label}
          </button>
        ))}
      </div>

      <div className="terminal" id="try-it-terminal" role="tabpanel" aria-live="polite">
        <p className="terminal__call">&gt; {active.call}</p>
        <p className="terminal__status">{active.status}</p>
        <div className="terminal__result">
          <p>{active.result}</p>
        </div>
      </div>
    </Section>
  );
}
