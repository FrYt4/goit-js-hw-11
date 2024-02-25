const gallery = document.querySelector('.gallery');

export function markup(images) {
  const markupImages = images
    .map(image => {
      const {
        webformatURL,
        largeimageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;

      return `
            <a class="gallery-link" href="${largeimageURL}">    
                <div class="gallery-item">
                    <img class="gallery-item__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
                    <div class="info">
                        <p class="info__item">
                        <b class="info__item-name">Likes</b>
                        ${likes}
                        </p>
                        <p class="info__item">
                        <b class="info__item-name">Views</b>
                        ${views}
                        </p>
                        <p class="info__item">
                        <b class="info__item-name">Comments</b>
                        ${comments}
                        </p>
                        <p class="info__item">
                        <b class="info__item-name">Downloads</b>
                        ${downloads}
                        </p>
                    </div>
                </div>
            </a>
        `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markupImages);
}