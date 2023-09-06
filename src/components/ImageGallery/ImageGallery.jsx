import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import 'react-toastify/dist/ReactToastify.css';

const ImageGallery = ({ onImgClick, images }) => {
  return (
    <ul className={css.listGallery}>
      <ImageGalleryItem
        images={images}
        onClick={largeImageURL => onImgClick(largeImageURL)}
      ></ImageGalleryItem>
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onImgClick: PropTypes.func,
};
