import { Component } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Section from './Section';

import { getImage } from 'servises/image-api';
import Button from './Button';
import Modal from './Modal';
import EmptyValue from './EmptyValue';

import { ImagePendingView } from './ImagePendingView';
import TextErrorView from './TextErrorView';

const Status = {
  IDLE: 'idle',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    EndOfImages: false,
    showModal: false,
    status: Status.IDLE,
    error: '',
    isLoading: false,
    newImages: '',
  };

  async componentDidUpdate(_, prevState) {
    const prevquery = prevState.query;
    const nextquery = this.state.query;
    const { page } = this.state;

    if (prevquery !== nextquery || page !== prevState.page) {
      try {
        this.setState({ EndOfImages: false, isLoading: true });

        const newImages = await getImage(nextquery, page);

        this.setState(prevState => ({
          images: [...prevState.images, ...newImages.hits],
          status: Status.RESOLVED,
          isLoading: false,
          newImages,
        }));

        if (this.state.page === 1 && newImages.totalHits > 0) {
          toast.success(`Cool! We found ${newImages.totalHits} images`);
        }

        const totalPages = Math.ceil(newImages.totalHits / 12);

        if (
          (newImages.totalHits !== 0 && newImages.totalHits < 12) ||
          (totalPages !== 0 && page >= totalPages)
        ) {
          toast.warning(`We are sorry but you have reached the end of images`);
        }

        if (newImages.totalHits < 12 || page >= totalPages) {
          this.setState({ EndOfImages: true });
        }

        if (newImages.totalHits === 0) {
          toast.warning(`No images found with name ${nextquery}`);
        }
      } catch (error) {
        this.setState({ error, status: Status.REJECTED });
      }
    }
  }

  handleSearchBarSubmit = queryObj => {
    const query = queryObj.query;

    if (query.trim() === '') {
      return toast.error('Please enter value of image');
    }

    if (query === this.state.query) {
      return toast.warning(
        `Meaning: ${query} Has already been found.  Please repeat your request`
      );
    }
    this.setState({ query, page: 1, images: [] });
  };

  onLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = imageForModal => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      imageForModal,
    }));
  };

  render() {
    const {
      images,
      showModal,
      imageForModal,
      status,
      error,
      isLoading,
      EndOfImages,
    } = this.state;

    return (
      <>
        <ToastContainer autoClose={3000} />
        <Section>
          <SearchBar onSubmit={this.handleSearchBarSubmit}></SearchBar>
          {status === 'idle' && <EmptyValue></EmptyValue>}
        </Section>

        {isLoading && <ImagePendingView />}

        {status === 'rejected' && <TextErrorView message={error.message} />}

        {status === 'resolved' && (
          <Section>
            <ImageGallery
              onImgClick={this.toggleModal}
              images={images}
            ></ImageGallery>

            {showModal && (
              <Modal onClose={this.toggleModal} image={imageForModal}></Modal>
            )}
            {!EndOfImages && <Button onClick={this.onLoadMoreClick}></Button>}
          </Section>
        )}
      </>
    );
  }
}
