export default function Section({ id, title, subtitle, children }) {
  return (
    <section className="section" id={id}>
      <div className="section__line" />
      <div className="section__head">
        <h2 className="section__title">{title}</h2>
        {subtitle && <p className="section__subtitle">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
