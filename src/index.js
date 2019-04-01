import './app.css';
import { Sort, sortByDate } from './services/util';
import { getYear, sortOptions, filters } from './view/util';
import { getArticles } from './services/articles';
import { render } from './view/render';

class App {
  constructor() {
    this.categories = [],
    this.sort = Sort.DESC
  }

  categoryChangeListener() {
    filters.forEach( input => input.addEventListener('change', event => {
      getArticles(this.categories, this.sort)
        .then(all => {
          render(all);
        });
    }))
  }

  sortingChangeListener() {
    sortOptions.forEach( input => input.addEventListener('change', event => {
      getArticles(this.categories, this.sort)
        .then(all => {
          render(all);
        });
    }))
  }

  init() {
    this.sortingChangeListener();
    this.categoryChangeListener();
  }
}

function init() {
  getYear();
  getArticles()
    .then(all => render(sortByDate(all)));
  const app = new App();
  app.init();
}

init();
