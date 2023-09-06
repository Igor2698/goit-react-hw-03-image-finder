import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
const ImageGalleryItem = ({ images, onClick }) => {
  return images.map(eachImg => {
    const { id, webformatURL, tags, largeImageURL } = eachImg;
    return (
      <li
        key={id}
        className={css.itemGallery}
        onClick={() => onClick(largeImageURL)}
      >
        <img src={webformatURL} width="100%" height="100%" alt={tags} />
      </li>
    );
  });
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
