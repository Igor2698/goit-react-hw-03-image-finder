import css from './ImageGallery.module.css';

import 'react-toastify/dist/ReactToastify.css';

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

export const ImageGallery = ({ children }) => {
  return <ul className={css.listGallery}>{children}</ul>;
};
