
// import { createCards } from "./src/js/photos";
// import Notiflix from 'notiflix';
// import { fetchArticles } from './src/js/pixabay';
// import axios from 'axios';

const input = document.querySelector(".input");
const picturesContainer = document.querySelector(".pictures-container")
const gallery = document.querySelector('.gallery');
const searchBtn = document.querySelector(".btn-search");




// TUTAJ SKONCZYŁAM

const query = "flower"

fetch(`https://pixabay.com/api/?key=34935392-24250165e01040adac8554f89&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`, {
    method: "GET",
})
    .then((response) => {
        console.log(response);
        return response.json();
    })
    .then((data) => {
        const hits = Object.values(data.hits);
        console.log("hits: ", hits);
        const picturesList = hits
            .map((hit) => {
                return `
                    <li>
                   
                    <div class="photo-card" id=${hit.id}>
                        <img class="gallery__image" src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
                        <div class="info">
                            <p class="info__item"> <b>Likes</b> ${hit.likes} </p>
                            <p class="info__item"> <b>Views</b> ${hit.views} </p>
                            <p class="info__item"> <b>Comments</b> ${hit.comments} </p>
                            <p class="info__item"> <b>Downloads</b> ${hit.downloads} </p>
                        </div>
                    </div>
                    </a >
                    </li>`;
                // <li>
                // <img src="${hit.webformatURL}"></img>
                // <p>Likes: ${hit.likes}</p>
                // </li>`;
            })
            .join("");
        gallery.innerHTML = picturesList;
        // hits.forEach((hit) => {
        //     console.log(hit.pageURL);
        // })
    });




{/* < a class="gallery__item" href="${hit.largeImageURL}" onclick="return false;" ></a> */}



















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

