
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const ApiKey = '42538770-38c8e4bc557ccec23452e1973' ;   //ApiKey 

try {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: ApiKey,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 40,
    },
  });

  console.log('API Response:', response.data); // Log the response

  return response.data.hits;
} catch (error) {
  console.error('Error with fetching images', error);
  return [];
}


let lightbox

//funkcja renderujaća obraz z galerri za pomocą map
export const renderImage = images => {
    const imageMarkup = images.map(image => {
        return`
        <div class="photo-card">
            <a href="${image.largeImageURL}" class="lightbox-item">
                <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            </a>
            <img src="" alt="" loading="lazy" />
            <div class="info">
                <p class="info-item"><b>Likes</b><br>${image.likes}</p>
                <p class="info-item"><b>Views</b><br>${image.Views}</p>
                <p class="info-item"><b>Comments</b><br>${image.comments}</p>
                <p class="info-item"><b>Downloads</b><br>${image.dowloads}</p>
            </div>
        </div>`;
    })
    .join('');

  const gallery = document.querySelector('.gallery');
  gallery.innerHTML += imageMarkup;

  // Inicjalizuj lub odśwież SimpleLightbox po dodaniu nowych obrazków
  if (!lightbox) {
    lightbox = new SimpleLightbox('.lightbox-item');
  } else {
    lightbox.refresh();
  }
};
