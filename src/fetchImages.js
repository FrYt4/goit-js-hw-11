import axios from 'axios';

export async function fetchImages(search, page, perPage) {
  const baseUrl = 'https://pixabay.com/api/';
  const KEY = '42538770-38c8e4bc557ccec23452e1973';
  const filter = `?key=${KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  const response = await axios.get(`${baseUrl}${filter}`);
  return response;
}