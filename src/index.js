import fetchApiImages from './api.js';
import { refs, apiOptions } from './api.js';

refs.form.addEventListener('submit', async e => {
    e.preventDefault();
  
    refs.gallary.innerHTML = '';
    refs.loadMore.classList.add('none');
    apiOptions.page = 1;
  
    await fetchApiImages(apiOptions.API_KEY, apiOptions.page);
  });
  
  refs.loadMore.addEventListener('click', async () => {
    apiOptions.page += 1;
  
    await fetchApiImages(apiOptions.API_KEY, apiOptions.page);
  });