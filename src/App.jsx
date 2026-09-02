import ExploreTheCode from "./components/ExploreTheCode.jsx";
import Hero from "./components/Hero.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import LogoLockup from "./components/LogoLockup.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import TopBanner from "./components/TopBanner.jsx";
import TryIt from "./components/TryIt.jsx";
import WhatGetsExposed from "./components/WhatGetsExposed.jsx";
import WhyItMatters from "./components/WhyItMatters.jsx";

export default function App() {
  return (
    <div className="page">
      <TopBanner />
      <main className="main">
        <LogoLockup />
        <Hero />
        <TryIt />
        <WhatGetsExposed />
        <WhyItMatters />
        <HowItWorks />
        <ExploreTheCode />
      </main>
      <SiteFooter />
    </div>
  );
}
