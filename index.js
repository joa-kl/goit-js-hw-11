
// import { createCards } from "./src/js/photos";
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchArticles } from './src/js/pixabay';
// import axios from 'axios';

const input = document.querySelector(".input");
const picturesContainer = document.querySelector(".pictures-container")
const gallery = document.querySelector('.gallery');
const searchBtn = document.querySelector(".btn-search");
const searchForm = document.querySelector('.search-form');
const loadMoreButton = document.querySelector('.btn-more');

let query = "";
let totalHits = 0;
let page = 1;
const perPage = 100;


searchForm.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

const fetchPictures = async () => {
    const response = await fetch(`https://pixabay.com/api/?key=34935392-24250165e01040adac8554f89&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`);
    const pictures = await response.json();
    return pictures;
};


fetchPictures()
    .then((data) => renderPicturesList(data))
    .catch(error => {
        console.log(error);
    });

searchBtn.addEventListener("click", () => {
    fetchPictures()
        .then((pictures) => renderPicturesList(pictures))
        .catch((error) => console.log(error))
        // .catch(() => Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again."))
    });


function onSearch(e) {
    e.preventDefault();
    page = 1;
    query = e.currentTarget.searchQuery.value.trim();
    clearFormGallery();
    loadMoreButton.classList.add('is-hidden');
    if (query === "") {
        gallery.innerHTML = "";
        noInfoForSearch();
        return;
    } 

    fetchPictures()
        .then(({ data }) =>
        {         
        if (data.totalHits === 0) {
            alertNoContentFound();
            console.log(alertNoContentFound());
            } else {
                renderPicturesList(data);
                // const lightbox = new SimpleLightbox('.gallery a', {
                //     captionDelay: 250,
                // }).refresh();
                addTotalInfoCounter(data);

                if (data.totalHits > perPage) {
                    loadMoreButton.classList.remove('is-hidden');
                }
            }
        })
        .catch(error => console.log(error));
}


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
    gallery.innerHTML = picturesList;
  
};


function onLoadMore() {
    page += 1;
    fetchPictures()
        .then(({ data }) => {
            renderPicturesList(data);
            const lightbox = new SimpleLightbox('.gallery a', {
                captionDelay: 250,
            }).refresh();

            const totalPages = Math.ceil(data.totalHits / perPage);

            if (page === totalPages) {
                loadMoreButton.classList.add('is-hidden');
                endOfContent();
            }
        })
        .catch(error => console.log(error));
}

function clearFormGallery() {
    gallery.innerHTML = '';
}

function addTotalInfoCounter(data) {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

function noInfoForSearch() {
    Notiflix.Notify.failure('Please specify your search query.');
}

function endOfContent() {
    Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
    );
}

function alertNoContentFound() {
    Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
    );
}
//     .then((data) => {
//         const hits = Object.values(data.hits);
//         console.log("hits: ", hits);
//         const picturesList = hits
//             .map((hit) => {
//                 return `
//                     <li>
                   
//                     <div class="photo-card" id=${hit.id}>
//                         <img class="gallery__image" src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
//                         <div class="info">
//                             <p class="info__item"> <b>Likes</b> ${hit.likes} </p>
//                             <p class="info__item"> <b>Views</b> ${hit.views} </p>
//                             <p class="info__item"> <b>Comments</b> ${hit.comments} </p>
//                             <p class="info__item"> <b>Downloads</b> ${hit.downloads} </p>
//                         </div>
//                     </div>
//                     </a >
//                     </li>`;
                // <li>
                // <img src="${hit.webformatURL}"></img>
                // <p>Likes: ${hit.likes}</p>
                // </li>`;
        //     })
        //     .join("");
        // gallery.innerHTML = picturesList;
        // hits.forEach((hit) => {
        //     console.log(hit.pageURL);
        // })
    // });
























// function fetchPictures() {
//     const URL = "https://pixabay.com/api/?key=34935392-24250165e01040adac8554f89&q=yellow+flower&image_type=photo&orientation=horizontal&safesearch=true";
    
//     return fetch(URL)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(response.status);
//             }
//             return response.json();
//         })
    
//         .catch(error => {
//             console.log(error);
//         });
// }

// console.log(fetchPictures);


// searchBtn.addEventListener("submit", () => {
//     fetchPictures()
//         .then((hits) => createCards(hits))
//         .catch(() => Notiflix.Notify.failure("Oops, there is no picture like that"))
// });

// function createCards(hits) {
//     const cards = hits
//         .map(hit => {
//             const {
//                 id,
//                 largeImageURL,
//                 webformatURL,
//                 tags,
//                 likes,
//                 views,
//                 comments,
//                 downloads,
//             } = hit;
//             return `
//         <a class="gallery__item" href="${largeImageURL}" onclick="return false;">
//         <div class="photo-card" id=${id}>
//         <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
//         <div class="info">
//           <p class="info__item"> <b>Likes</b> ${likes} </p>
//           <p class="info__item"> <b>Views</b> ${views} </p>
//           <p class="info__item"> <b>Comments</b> ${comments} </p>
//           <p class="info__item"> <b>Downloads</b> ${downloads} </p>
//         </div>
//       </div>
//       </a>`;
//         })
//         .join('');

//     gallery.insertAdjacentHTML('beforeend', cards);
// }

// console.log(createCards);



// // axios.defaults.baseURL = 'https://pixabay.com/api/';
// const KEY = '34935392-24250165e01040adac8554f89';
// const query = "dog";
// const URL = 'https://pixabay.com/api/' + `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

// getJSON(URL, function (data) {
//     if (parseInt(data.totalHits) > 0)
//         $.each(data.hits, function (i, hit) { console.log(hit.pageURL); });
//     else
//         console.log('No hits');
// });

