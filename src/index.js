import Notiflix from 'notiflix';

// const URL = `https://pixabay.com/api/?key=34935392-24250165e01040adac8554f89&q=${customerInput}&image_type=photo&orientation=horizontal&safesearch=true`
// const URL = `https://pixabay.com/api/?key=34935392-24250165e01040adac8554f89&q=yellow+flower&image_type=photo&orientation=horizontal&safesearch=true`

fetch(`https://pixabay.com/api/?key=34935392-24250165e01040adac8554f89&q=yellow+flower&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    })
