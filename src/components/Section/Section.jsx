import css from './Section.module.css';
import PropTypes from 'prop-types';

const Section = ({ children }) => {
  return (
    <section className={css.mainSection}>
      <div className={css.mainDiv}>{children}</div>
    </section>
  );
};

export default Section;

Section.propTypes = {
  children: PropTypes.node.isRequired,
};
