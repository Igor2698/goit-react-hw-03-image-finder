import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Section from './Section/Section';

export class App extends Component {
  state = {
    image: '',
  };

  handleSearchBarSubmit = image => {
    this.setState({ image });
  };

  render() {
    return (
      <>
        <Section>
          <SearchBar onSubmit={this.handleSearchBarSubmit}></SearchBar>
        </Section>
        <Section>
          <ImageGallery image={this.state.image}></ImageGallery>
        </Section>
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
