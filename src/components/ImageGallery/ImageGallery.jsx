import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

import 'react-toastify/dist/ReactToastify.css';

const ImageGallery = ({ children }) => {
  return <ul className={css.listGallery}>{children}</ul>;
};

export default ImageGallery;

ImageGallery.propTypes = {
  children: PropTypes.node.isRequired, 
};
