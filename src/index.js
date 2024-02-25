import { fetchImages } from './fetchImages';
import { markup } from './markup';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadButton = document.querySelector('.load-button');
let search = '';
let page = 1;
let perPage = 40;

// eventlisteners

searchForm.addEventListener('submit', onSubmit);
loadButton.addEventListener('click', onLoadButton);

// events

function onSubmit(e) {
  e.preventDefault();

  search = e.currentTarget.searchQuery.value.trim();
  gallery.innerHTML = '';
  loadButton.classList.add('is-hidden');

  if (search === '') {
    alertNoEmptySearch();
    return;
  }

  fetchImages(search, page, perPage)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        alertNotFound();
      } else {
        markup(data.hits);
        alertImgFound(data);
      }
      if (data.totalHits > perPage) {
        loadButton.classList.remove('is-hidden');
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      searchForm.reset();
    });
}

function onLoadButton(e) {
  page += 1;

  fetchImages(search, page, perPage)
    .then(({ data }) => {
        markup(data.hits);
      const totalPages = Math.ceil(data.totalHits / perPage);

      if (page > totalPages) {
        onLoadButton.classList.add('is-hidden');
        alertEndOfSearch();
        }
        modalWindow();
    })
    .catch(error => console.log(error));
}

function alertImgFound(data) {
  Notiflix.Notify.success(`${data.totalHits} images found.`);
}

function alertNotFound() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function alertNoEmptySearch() {
  Notiflix.Notify.failure(
    'The search string cannot be empty. Please specify your search query.'
  );
}

function alertEndOfSearch() {
  Notiflix.Notify.failure(
    "We're sorry, but you've reached the end of search results."
  );
}

const modalWindow = function () {
  const lightbox = new SimpleLightbox('.gallery', {
    captionsData: 'alt',
    captionDelay: 300,
  });
  return lightbox;
};