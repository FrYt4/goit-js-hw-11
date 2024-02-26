import Notiflix from 'notiflix';
import { renderImage } from './fetchImages';
import { fetchImages } from './fetchImages';
import { ranodmBackgroundImage } from './backgroundTools';

const searchForm = document.getElementById('search-form');
const loadMoreButton = document.querySelector('.load-more');

// Funkcja obsługująca wyszukiwanie
let currentPage = 1;
let currentQuery = '';
let totalDisplayedImages = 0; // Liczba obrazków wyświetlonych na stronie

// Funkcja obsługująca wyszukiwanie
const handleSearch = async event => {
  event.preventDefault();
  const query = searchForm.searchQuery.value.trim();
  if (query === '') {
    return; // Nie wykonuj wyszukiwania dla pustego zapytania
  }

  // Zapisz aktualne zapytanie
  currentQuery = query;

  // Wyczyść zawartość galerii i zresetuj liczbę wyświetlonych obrazków
  document.querySelector('.gallery').innerHTML = '';
  totalDisplayedImages = 0;

  // Wyślij żądanie HTTP
  const images = await fetchImages(query);
  if (images.length === 0) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    loadMoreButton.style.display = 'none'; // Ukryj przycisk "Load more" na końcu wyników
    return;
  }

  // Zaktualizuj stronę i wyrenderuj obrazy
  currentPage = 1;
  renderImage(images);

  // Ustaw tło na losowy obrazek z galerii
  ranodmBackgroundImage(images);

  // Zaktualizuj liczbę wyświetlonych obrazków
  totalDisplayedImages += images.length;

  // Pokaż przycisk "Load more", jeśli pobrano mniej niż 40 obrazków
  if (images.length < 40) {
    loadMoreButton.style.display = 'none';
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  } else {
    loadMoreButton.style.display = 'block';
  }

  // Pokaż powiadomienie o liczbie znalezionych obrazków
  Notiflix.Notify.success(`Hooray! We found ${totalDisplayedImages} images.`);
};

// Funkcja obsługująca ładowanie kolejnych obrazków
const loadMoreImages = async () => {
  currentPage++;
  const previousImageCount = document.querySelectorAll('.photo-card').length; // Liczba obecnych obrazków
  const images = await fetchImages(currentQuery, currentPage);
  // Ukryj przycisk "Load more" jeśli nie ma więcej obrazków
  if (images.length === 0) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    loadMoreButton.style.display = 'none'; // Ukryj przycisk "Load more" na końcu wyników
    return;
  }

  // Renderuj nowe obrazy na końcu galerii
  renderImage(images);

  // Ustaw tło na losowy obrazek z galerii
  ranodmBackgroundImage(images);

  // Sprawdź, czy faktycznie dodano nowe obrazy
  const newImageCount =
    document.querySelectorAll('.photo-card').length - previousImageCount;
  if (newImageCount > 0) {
    // Przewiń widok do góry nowych obrazków
    const firstNewImage = document.querySelector('.gallery').lastElementChild;
    firstNewImage.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Zaktualizuj liczbę wyświetlonych obrazków
    totalDisplayedImages += newImageCount;

    // Wyświetl informację o liczbie nowych obrazków
    Notiflix.Notify.success(`${totalDisplayedImages} images loaded.`);
  } else {
    Notiflix.Notify.info('No new images loaded.');
  }

  // Ukryj przycisk "Load more" jeśli pobrano mniej niż 40 obrazków
  if (images.length < 40) {
    loadMoreButton.style.display = 'none';
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
};

searchForm.addEventListener('submit', handleSearch);
loadMoreButton.addEventListener('click', loadMoreImages);
loadMoreButton.style.display = 'none';