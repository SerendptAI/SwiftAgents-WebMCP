import { useEffect, useState } from "react";
import { Alignment, Fit, Layout, RuntimeLoader, useRive } from "@rive-app/react-canvas";
import riveWasmUrl from "@rive-app/canvas/rive.wasm?url";

// Serve the runtime's wasm from our own bundle instead of the default unpkg CDN,
// so the animation still boots on locked-down networks.
RuntimeLoader.setWasmUrl(riveWasmUrl);

const RIVE_SRC = "/assets/hero-orb.riv";
const FALLBACK_SRC = "/assets/hero-orb.webp";
const LOAD_TIMEOUT_MS = 4000;

export default function HeroOrb({ style }) {
  const [failed, setFailed] = useState(false);
  const { RiveComponent, rive } = useRive({
    src: RIVE_SRC,
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
    onLoadError: () => setFailed(true),
  });

  // onLoadError does not fire for every failure mode (missing wasm, no canvas
  // support, a stalled fetch), so give the runtime a deadline as well.
  useEffect(() => {
    if (rive || failed) return undefined;
    const timer = setTimeout(() => setFailed(true), LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [rive, failed]);

  if (failed) {
    return <img src={FALLBACK_SRC} alt="" style={style} />;
  }

  return <RiveComponent style={style} />;
}
