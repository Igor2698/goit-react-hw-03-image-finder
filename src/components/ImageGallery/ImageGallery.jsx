import { Component } from 'react';
import { ImagePendingView } from '../ImagePendingView';
import { Button } from '../Button/Button';
import css from './ImageGallery.module.css';
import { ImagesApiService } from 'servises/image-api';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import TextErrorView from 'components/TextErrorView';
import { Modal } from 'components/Modal/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class ImageGallery extends Component {
  state = {
    image: { hits: [] },
    error: null,
    status: Status.IDLE,
    showModal: false,
    linkForModal: '',
    endOfImage: false,
  };

  imagesApiService = new ImagesApiService();

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.image.image;
    const nextName = this.props.image.image;

    if (prevName !== nextName) {
      this.setState({ status: Status.PENDING, endOfImage: false });

      this.imagesApiService
        .getImage(nextName)
        .then(image => {
          if (image.total === 0) {
            toast.error(
              'Did not find image with this value. Please enter another value'
            );
            this.setState({ status: Status.IDLE });
            return;
          }

          if (image.totalHits <= this.imagesApiService.limit) {
            this.setState({ endOfImage: true });
          }

          toast.success(`Cool! We found ${image.totalHits} images`);

          this.setState({
            image,
            status: Status.RESOLVED,
          });
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  addNewImages() {
    this.imagesApiService
      .getImage(this.props.image.image)
      .then(newImages => {
        this.setState(prevState => ({
          image: { hits: [...prevState.image.hits, ...newImages.hits] },
        }));
        const totalPages = newImages.totalHits / this.imagesApiService.limit;
        if (this.imagesApiService.page >= totalPages) {
          this.setState({ endOfImage: true });
        }
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  }

  toggleModal = linkForModal => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      linkForModal,
    }));
  };

  render() {
    const { image, error, status } = this.state;

    if (status === 'idle') {
      return (
        <div className={css.idleText}>
          Here will be your pictures. Please enter value of image
        </div>
      );
    }

    if (status === 'pending') {
      return <ImagePendingView />;
    }

    if (status === 'rejected') {
      return <TextErrorView message={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <>
          {this.state.showModal && (
            <Modal
              onClose={this.toggleModal}
              image={image.hits}
              link={this.state.linkForModal}
            ></Modal>
          )}
          <ul className={css.listGallery}>
            <ImageGalleryItem
              image={image.hits}
              onClick={webformatURL => this.toggleModal(webformatURL)}
            ></ImageGalleryItem>
          </ul>

          {!this.state.endOfImage && (
            <Button
              onClick={() => {
                this.imagesApiService.incrementPage();
                this.addNewImages();
              }}
            ></Button>
          )}
        </>
      );
    }
  }
}
