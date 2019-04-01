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

export function render(articlesList) {
  const root = document.querySelector('.atricles-list');
  root.innerHTML = '';
  articlesList.map( article => {
    let el = createArticleElement(article);
    root.appendChild(el);
  })
}
