import './app.css';

const getYear = () => document.querySelector('.year-now').innerHTML = new Date().getFullYear();

class Articles {
  constructor() {
    this.inputs = document.querySelectorAll('.category .checkbox'),
    this.articlesList = [],
    this.categoriesList = null
  }

  async getArticles() {
    this.articlesList = []
    console.log('[getArticles]', typeof(this.articlesList))
    this.categoriesList.forEach( cat => {
      fetch(`http://localhost:6010/articles/${cat}`)
        .then(res => res.json())
        .then(data => {
          this.articlesList.push(...data.articles)
        })
        .catch( err => console.error(error));
    })
  }

  getArticleList() {
    return this.articlesList
  }

  setActiveCategory(category) {
    this.categoriesList = category
  }

  activeCategories() {
    let categories = new Set();
    this.inputs.forEach( input => {
      if (input.checked) {
        categories.add(input.value)
      } else {
        categories.delete(input.value)
      }
    });
    console.log(categories)
    return categories
  }

  createArticleElement(element) {
    return `
      <article class="article" id="${element.id}">
        <img class="article-img" src="${element.image}" alt="">
        <div class="article-info">
          <h2 class="article-title">${element.title}</h2>
          <span class="article-date">${element.date}</span>
          <p class="article-preamble">${element.preamble}</p>
        </div>
      </article>
    `
  }

  render() {
    const root = document.querySelector('.atricles-list');
    root.innerHTML = '';
    console.log('render', typeof(this.articlesList), this.articlesList, this.articlesList.length)
  }

  async init() {
    this.setActiveCategory(this.activeCategories());
    this.getArticles();
    this.render();
    this.inputs.forEach( input => input.addEventListener('change', () => {
      this.setActiveCategory(this.activeCategories())
      this.getArticles()
      this.render()
    }))
  }
}

async function init() {
  getYear();
  const reader = new Articles();
  reader.init();
}
init();
