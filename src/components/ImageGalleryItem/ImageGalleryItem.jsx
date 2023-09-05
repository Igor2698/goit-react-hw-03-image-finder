import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images, onClick }) => {
  return images.map(eachImg => {
    const { id, webformatURL, tags, largeImageURL } = eachImg;
    return (
      <li
        key={id}
        className={css.itemGallery}
        onClick={() => onClick(largeImageURL)}
      >
        <img src={webformatURL} width="400" height="300" alt={tags} />
      </li>
    );
  });
};