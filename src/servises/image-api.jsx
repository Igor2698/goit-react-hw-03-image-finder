const keys = {
  BASE_URL: 'https://pixabay.com/api/',
  API_KEY: '38581937-9c20710af1d4a9eb0308799a1',
};

export async function getImage(value, page = 1) {
  const url = `${keys.BASE_URL}?key=${keys.API_KEY}&q=${value}&page=${page}&per_page=12`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Did not find image with value ${value}`);
    }
  } catch (error) {
    throw error;
  }
}

// page=${this.page}

// async getImage

//   incrementPage() {
//     this.page += 1;
//   }

//   resetPage() {
//     this.page = 1;
//   }
// }

// export class ImagesApiService {
//   SearchQuery = '';
//   page = 1;
//   totalPages = 0;
//   limit = 40;
