export function createArticleElement(element) {
  const article = document.createElement('article');
  article.classList.add('article');
  article.id = element.id;
  const markdown = `
    <img class="article-img" src="${element.image}" alt="Random image">
    <div class="article-info">
      <h2 class="article-title">${element.title}</h2>
      <span class="article-date">${element.date}</span>
      <p class="article-preamble">${element.preamble}</p>
    </div>`;
  article.innerHTML = markdown;
  return article;
}

export function createCategoryFilters(element, listner) {
  const fieldset = document.createElement('fieldset');
  fieldset.classList.add('fieldset','category');
  const markup = `
    <input checked type="checkbox" name="c${element}" id="c${element}" class="checkbox" value="sports">
    <label for="c${element}" class="checkbox-label">${element.charAt(0).toUpperCase() + element.slice(1)}</label>
  `;
  fieldset.innerHTML = markup;
  fieldset.querySelector('input').addEventListener('change', listner);

  return fieldset
}

export function renderCategoryFilters(list, listner) {
  let categories = Object.values(list)
  .filter( value => value !== list.ALL );
  const root = document.querySelector('.filters');
  categories.map( cat => {
    let el = createCategoryFilters(cat, listner);
    root.appendChild(el)
  });
}

export function renderArticles(articlesList) {
  const root = document.querySelector('.atricles-list');
  root.innerHTML = '';
  articlesList.map( article => {
    let el = createArticleElement(article);
    root.appendChild(el);
  })
}
