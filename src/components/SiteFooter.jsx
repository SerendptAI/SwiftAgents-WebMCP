import { site } from "../data/site.js";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <p>{site.copyright}</p>
      <p className="footer__note">{site.footerNote}</p>
    </footer>
  );
}
