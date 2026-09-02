import { site } from "../data/site.js";

export default function TopBanner() {
  return (
    <div className="banner">
      <div className="banner__left">
        <img className="icon-14" src="/assets/alert-triangle.svg" alt="" />
        <p>{site.bannerText}</p>
      </div>
      <a className="banner__link" href={site.bannerLinkHref} target="_blank" rel="noreferrer">
        {site.bannerLinkLabel}
      </a>
    </div>
  );
}
