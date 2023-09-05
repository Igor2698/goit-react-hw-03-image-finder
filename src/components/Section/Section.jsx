import css from './Section.module.css';

const Section = ({ children }) => {
  return (
    <section className={css.mainSection}>
      <div className={css.mainDiv}>{children}</div>
    </section>
  );
};

export default Section;
