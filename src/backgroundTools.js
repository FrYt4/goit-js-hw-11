let backgroundImageInterval; // Zmienna do przechowywania interwału zmiany tła
// Funkcja ustawiająca tło na losowy obrazek z galerii

export const ranodmBackgroundImage = image => {
    // Sprawdź, czy tablica obrazków jest pusta
    if (image.length === 0) {
        console.error('No images available to set bacgorund image');
        return;
    }
 // Losujemy losowy indeks z galerii
    const randomIndex = Math.floor(Math.random() * image.length);
    const randomImage = images[randomIndex];

// Ustawiamy obrazek jako tło strony
  document.body.style.backgroundImage = `url(${randomImage.webformatURL})`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';
    
}  // Ustawiamy interwał zmiany tła co 5 sekund
  clearInterval(backgroundImageInterval);
  backgroundImageInterval = setInterval(() => {
    setRandomBackgroundImage(images);
  }, 5000);
