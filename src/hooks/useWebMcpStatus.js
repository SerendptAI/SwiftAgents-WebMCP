import { useEffect, useState } from "react";

const READY_EVENT = "swiftagents:webmcp-ready";

function readStatus() {
  return {
    supported: "modelContext" in navigator,
    registeredTools: window.__swiftagents?.registeredTools ?? [],
  };
}

/**
 * Reports what widget.js actually managed to register, rather than assuming it
 * worked — the browser needs WebMCP enabled for any of it to happen.
 */
export function useWebMcpStatus() {
  const [status, setStatus] = useState(readStatus);

  useEffect(() => {
    const sync = () => setStatus(readStatus());
    sync();
    window.addEventListener(READY_EVENT, sync);
    return () => window.removeEventListener(READY_EVENT, sync);
  }, []);

  return status;
}
