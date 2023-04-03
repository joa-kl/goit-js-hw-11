export { renderPicturesList };
const gallery = document.querySelector('.gallery');

function renderPicturesList(data) {
  console.log(data.totalHits);
  const hits = Object.values(data.hits);
  console.log("hits: ", hits);
  const picturesList = hits
    .map((hit) => {
      return `
                <li class="gallery__item">
                    <div class="photo-card" id=${hit.id}>
                        <a  href="${hit.largeImageURL}" onclick="return false;">
                            <img class="gallery__image" src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
                            <div class="info">
                                <p class="info__item"> <b>Likes</b> ${hit.likes} </p>
                                <p class="info__item"> <b>Views</b> ${hit.views} </p>
                                <p class="info__item"> <b>Comments</b> ${hit.comments} </p>
                                <p class="info__item"> <b>Downloads</b> ${hit.downloads} </p>
                            </div>
                   
                        </a>
                     </div>
                </li>`;

    })
    .join("");
  gallery.insertAdjacentHTML('beforeend', picturesList);
};
