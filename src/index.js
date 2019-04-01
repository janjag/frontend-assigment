import './app.css';
import { getYear, filters, Sort, sortOptions, sortByDate } from './services/util';
import { getArticles } from './services/articles';
import { render } from './services/render';

class App {
  constructor() {
    this.categories = [],
    this.sort = Sort.DESC
  }

  checkActiveCategories() {
    let localCategories = [];
    filters.forEach( input => {
      if (input.checked) {
        localCategories.push(input.value);
      }
    });
    this.categories = [...localCategories]
  }

  handleCategoryChange() {
    filters.forEach( input => input.addEventListener('change', event => {
      this.checkActiveCategories();
      getArticles(this.categories, this.sort)
        .then(all => {
          render(all);
        });
    }))
  }

  checkActiveSorting() {
    sortOptions.forEach( input => {
      if (input.checked) {
        this.sort = Sort.ASC
      } else {
        this.sort = Sort.DESC
      }
    });
  }

  handleSortingChange() {
    sortOptions.forEach( input => input.addEventListener('change', event => {
      this.checkActiveSorting();
      getArticles(this.categories)
        .then(all => {
          render(all);
        });
    }))
  }

  init() {
    this.checkActiveCategories();
    this.handleCategoryChange();
    this.handleSortingChange();
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
