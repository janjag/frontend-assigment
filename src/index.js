import './app.css';
import { getYear, inputs } from './services/util';
import { getArticles } from './services/articles';
import { render } from './services/render';


function checkActiveCategories() {
  let categories = [];
  inputs.forEach( input => {
    if (input.checked) {
      categories.push(input.value);
    }
  });
  return categories;
}

function handleCategoryChange() {
  inputs.forEach( input => input.addEventListener('change', event => {
    getArticles(checkActiveCategories())
      .then(all => {
        render(all);
      });
  }))
}

function init() {
  getYear();
  getArticles()
    .then(all => render(all));
  handleCategoryChange();
}

init();
