// The design specifies the "Without WebMCP" panel; the "With WebMCP" panel is
// written to mirror it.
export const whyItMattersOptions = [
  {
    id: "without",
    label: "Without WebMCP",
    tone: "negative",
    icon: "/assets/x-circle.svg",
    title: "Agents hit a wall",
    body: "They can read a public page fine, but a login screen or an unfamiliar layout stops them cold. No settings, no reports, no answers.",
  },
  {
    id: "with",
    label: "With WebMCP",
    tone: "positive",
    icon: "/assets/check-circle.svg",
    title: "Agents get a map",
    body: "The widget hands over the navigation graph, the knowledge base, and live metrics as real tools. The agent reads them directly instead of guessing.",
  },
];
