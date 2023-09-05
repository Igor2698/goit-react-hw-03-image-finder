import css from './Button.module.css';
export const Button = ({ onClick }) => {
  return (
    <button className={css.buttonLoadMore} type="button" onClick={onClick}>
      Load More
    </button>
  );
};
