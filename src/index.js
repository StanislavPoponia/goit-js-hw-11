import fetchApiImages from './api.js';
import { refs, apiOptions } from './api.js';

refs.form.addEventListener('submit', async e => {
    e.preventDefault();
  
    refs.gallery.innerHTML = '';
    refs.loadMore.classList.add('none');
    apiOptions.page = 1;
    apiOptions.query = event.target.elements.searchQuery.value;
  
    await fetchApiImages(apiOptions.API_KEY);
  });
  
  refs.loadMore.addEventListener('click', async () => {
    apiOptions.page += 1;
  
    await fetchApiImages(apiOptions.API_KEY);
  });