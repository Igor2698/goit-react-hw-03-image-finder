import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Section from './Section';
import ImageGalleryItem from './ImageGalleryItem';
import { getImage } from 'servises/image-api';
import Button from './Button';
import Modal from './Modal';
import EmptyValue from './EmptyValue';

import { ImagePendingView } from './ImagePendingView';
import TextErrorView from './TextErrorView';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: { hits: [] },
    EndOfImages: false,
    showModal: false,
    status: Status.IDLE,
    error: '',
  };

  componentDidUpdate(_, prevState) {
    const prevquery = prevState.query;
    const nextquery = this.state.query;
    const { page } = this.state;

    if (prevquery !== nextquery) {
      if (nextquery.trim() === '') {
        toast.error('Please enter value of image');

        return;
      }
      this.setState({ status: Status.PENDING, EndOfImages: false });

      getImage(nextquery, page)
        .then(newImages => {
          this.setState({
            images: newImages,
            status: Status.RESOLVED,
          });

          toast.success(`Cool! We found ${newImages.totalHits} images`);

          if (12 > newImages.totalHits) {
            toast.warning(
              `We are sorry but you have reached the end of images`
            );
            this.setState({ EndOfImages: true });
          }
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  handleSearchBarSubmit = queryObj => {
    const query = queryObj.query;
    this.setState({ query });
  };

  onLoadMoreClick = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        const { page, query } = this.state;

        getImage(query, page)
          .then(newImages => {
            const totalPages = Math.ceil(newImages.totalHits / 12);
            if (page >= totalPages) {
              this.setState({ EndOfImages: true });
              toast.warning(
                `We are sorry but you have reached the end of images`
              );
            }
            this.setState(prevState => ({
              images: { hits: [...prevState.images.hits, ...newImages.hits] },
            }));
          })
          .catch(error => this.setState({ error }));
      }
    );
  };

  toggleModal = imageForModal => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      imageForModal,
    }));
  };

  render() {
    const { images, EndOfImages, showModal, imageForModal, status, error } =
      this.state;

    if (status === 'idle') {
      return (
        <Section>
          <SearchBar onSubmit={this.handleSearchBarSubmit}></SearchBar>
          <EmptyValue></EmptyValue>
        </Section>
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
          <Section>
            <SearchBar onSubmit={this.handleSearchBarSubmit}></SearchBar>
          </Section>
          <Section>
            <>
              <ImageGallery>
                <ImageGalleryItem
                  images={images.hits}
                  onClick={largeImageURL => this.toggleModal(largeImageURL)}
                ></ImageGalleryItem>
              </ImageGallery>
              {!EndOfImages && <Button onClick={this.onLoadMoreClick}></Button>}
            </>
          </Section>
          {showModal && (
            <Modal onClose={this.toggleModal} image={imageForModal}></Modal>
          )}
          <ToastContainer autoClose={3000} />
        </>
      );
    }
  }
}
