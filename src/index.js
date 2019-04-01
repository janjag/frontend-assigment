import './app.css';
import { Sort, sortByDate, Category } from './services/util';
import { getYear, sortOptions, filters } from './view/util';
import { getArticles } from './services/articles';
import { renderArticles } from './view/render';

class App {
  constructor(categories = []) {
    this.categories = categories,
    this.sort = Sort.DESC
  }

  attachCategoryChangeListeners() {
    filters.forEach( input => input.addEventListener('change', event => {
      const {
        value,
        checked
      } = event.target;

      const inCategoriesIndex = this.categories.indexOf(value);

      if (checked && inCategoriesIndex === -1) {
          this.categories.push(value);
      } else if (!checked && inCategoriesIndex !== -1) {
          this.categories.splice(inCategoriesIndex, 1);
      }

      getArticles(this.categories)
        .then(all => sortByDate(all, this.sort))
        .then(sorted => renderArticles(sorted));
    }))
  }

  attachSortingChangeListeners() {
    sortOptions.forEach( input => input.addEventListener('change', event => {
      const {
        checked
      } = event.target;

      this.sort = checked ? Sort.ASC : Sort.DESC;

      getArticles(this.categories)
        .then(all => sortByDate(all, this.sort))
        .then(sorted => renderArticles(sorted));
    }))
  }

  init() {
    this.attachSortingChangeListeners();
    this.attachCategoryChangeListeners();
  }
}

function init() {
  getYear();
  getArticles()
    .then(all => renderArticles(sortByDate(all)));
  const app = new App([ Category.SPORTS, Category.SPORTS ]);
  app.init();
}

init();
