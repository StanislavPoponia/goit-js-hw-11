import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.esm';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const apiOptions = {
    API_KEY: '37073976-b2cdc1fed064addf83f6fd0ff',
    page: 1,
  };

  export const refs = {
    gallary: document.querySelector('.gallery'),
    inputSearch: document.querySelector('input[name="searchQuery"]'),
    form: document.querySelector('#search-form'),
    btnMore: document.querySelector('.load-more'),
  };

