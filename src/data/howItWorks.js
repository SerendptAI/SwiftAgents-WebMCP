// Step 3 is specified in the design; steps 1 and 2 are written to match it.
export const howItWorksSteps = [
  {
    id: 1,
    title: "Paste one script tag",
    body: "A company drops the standard SwiftAgents widget onto their site. No extra developer work, no per-page wiring.",
  },
  {
    id: 2,
    title: "Tools register themselves",
    body: "The widget checks for WebMCP support and registers the tool schemas into navigator.modelContext on load.",
  },
  {
    id: 3,
    title: "Agents call them",
    body: "Any visiting agent calls a tool. Swift Agents infrastructure answers with real, live data.",
  },
];

export const defaultStepId = 3;
