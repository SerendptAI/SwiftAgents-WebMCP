import { useWebMcpStatus } from "../hooks/useWebMcpStatus.js";
import { site } from "../data/site.js";

function label({ supported, registeredTools }) {
  if (!supported) return { text: "WebMCP not detected", state: "off" };
  if (registeredTools.length === 0) return { text: "Registering…", state: "pending" };
  return { text: "Widget active", state: "on" };
}

export default function StatusStrip() {
  const { text, state } = label(useWebMcpStatus());

  return (
    <div className="status">
      <span className="status__lead">
        <span className="status__dot" data-state={state} />
        <span className="status__label">{text}</span>
      </span>
      <span className="status__sep" />
      <code className="status__snippet">{site.scriptSnippet}</code>
    </div>
  );
}
