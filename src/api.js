import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.esm';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const apiOptions = {
    API_KEY: '37073976-b2cdc1fed064addf83f6fd0ff',
    page: 1,
    query: null,
  };

  export const refs = {
    gallery: document.querySelector('.gallery'),
    inputSearch: document.querySelector('input[name="searchQuery"]'),
    form: document.querySelector('#search-form'),
    loadMore: document.querySelector('.load-more'),
  };

  function pushImages(data) {
    const card = data.hits
      .map(e => {
        return `<div class="photo-card button-rgb">
          <a href="${e.largeImageURL}"><img width="350" height="200" src="${e.webformatURL}" alt="${e.tags}" loading="lazy" /></a>
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${e.likes}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${e.views}
            </p>
            <p class="info-item">
              <b>Comments</b>
              ${e.comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${e.downloads}
            </p>
          </div>
        </div>`;
      })
      .join('');
      return card;
  }
  
  export default async function fetchApiImages(API_KEY) {
    await axios
      .get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${apiOptions.query}&per_page=40&page=${apiOptions.page}&image_type=photo&orientation=horizontal&safesearch=true`
      )
      .then(({ data }) => {

        refs.gallery.insertAdjacentHTML('beforeend', pushImages(data));
      
        refs.loadMore.classList.remove('none');
        new SimpleLightbox('.gallery a', {
          captionsData: 'alt',
          captionDelay: 250,
        });

        if (apiOptions.query.trim() === '') {
          refs.gallery.classList.add('none');
          refs.loadMore.classList.add('none');
          Notify.warning('Please enter your query');
          return;
        }
       
         if  (data.hits.length > 0) {
           Notify.success(`Hooray! We found ${data.totalHits} images.`);
           refs.gallery.classList.remove('none');
         } 
         else {  (data.totalHits === 0) ;
         refs.loadMore.classList.add('none');
          Notify.failure(
           'Sorry, there are no images matching your search query. Please try again.'
          );
           return;
        }
        
        if (data.hits.length < 40) {
          refs.loadMore.classList.add('none');
          Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
          return;
        }
      })
      .catch(error => Notify.failure('Failure! not found api'));
  }

