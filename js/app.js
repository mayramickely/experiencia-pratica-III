import { initRouter } from './router.js';
import { renderTo } from './templates.js';

document.addEventListener('DOMContentLoaded', () => {
  initRouter({
    '#/': () => import('./views/home.js').then(m => m.default()),
    '#/form': () => import('./views/formView.js').then(m => m.default())
  });

  if(!location.hash) location.hash = '#/';
});