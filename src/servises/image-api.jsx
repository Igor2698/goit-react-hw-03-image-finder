const keys = {
  BASE_URL: 'https://pixabay.com/api/',
  API_KEY: '38581937-9c20710af1d4a9eb0308799a1',
};

const searchParams = new URLSearchParams({
  key: keys.API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: 40,
});

export class ImagesApiService {
  SearchQuery = '';
  page = 1;
  totalPages = 0;
  limit = 40;

  async getImage(value) {
    const url = `${keys.BASE_URL}?${searchParams}&q=${value}&page=${this.page}`;

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    }

    return Promise.reject(new Error(`Did not find image wiwh value ${value}`));
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
