import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Section from './Section/Section';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { getImage } from 'servises/image-api';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: { hits: [] },
    EndOfImages: false,
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    const { page } = this.state;

    const prevquery = prevState.query;
    const nextquery = this.state.query;

    if (prevquery !== nextquery) {
      this.setState({ EndOfImages: false });
      getImage(nextquery)
        .then(newImages => {
          this.setState({
            images: newImages,
          });

          const totalPages = Math.ceil(newImages.totalHits / 12);
          if (page >= totalPages || 12 > newImages.totalHits) {
            this.setState({ EndOfImages: true });
          }
        })
        .catch(error => this.setState({ error }));
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
    }));
    this.setState({ imageForModal });
  };

  render() {
    const { images, EndOfImages, showModal, imageForModal } = this.state;

    return (
      <>
        <Section>
          <SearchBar onSubmit={this.handleSearchBarSubmit}></SearchBar>
        </Section>
        <Section>
          {images.hits && (
            <>
              <ImageGallery>
                <ImageGalleryItem
                  images={images.hits}
                  onClick={largeImageURL => this.toggleModal(largeImageURL)}
                ></ImageGalleryItem>
              </ImageGallery>
              {!EndOfImages && <Button onClick={this.onLoadMoreClick}></Button>}
            </>
          )}
        </Section>
        {showModal && (
          <Modal onClose={this.toggleModal} image={imageForModal}></Modal>
        )}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
