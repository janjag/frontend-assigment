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
    this.categoriesList.forEach( cat => {
      fetch(`http://localhost:6010/articles/${cat}`)
        .then(res => res.json())
        .then(data => {
          this.articlesList.push(...data.articles)
        })
        .catch( err => console.error(err));
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
    const article = document.createElement('article');
    article.classList.add('article')
    article.id = element.id

    const img = document.createElement('img')
    img.classList.add('article-img')
    img.src = element.image
    img.alt = "Random image"
    article.appendChild(img)

    const info = document.createElement('div')
    info.classList.add("article-info")

    const title = document.createElement('h2')
    title.classList.add('article-title')
    title.innerText = element.title
    
    const date = document.createElement('span')
    date.classList.add('article-date')
    date.innerText = element.date

    const preamble = document.createElement('p')
    preamble.classList.add('article-preamble')
    preamble.innerText = element.preamble

    info.appendChild(title);
    info.appendChild(date);
    info.appendChild(preamble);

    article.appendChild(info);

    return article
  }

  render() {
    console.log('render', this.articlesList)
    setTimeout( () => {
      const root = document.querySelector('.atricles-list');
      root.innerHTML = '';
      this.articlesList.forEach( item => {
        let el = this.createArticleElement(item);
        root.appendChild(el)
      })
    }, 0)
  }

  async init() {
    this.setActiveCategory(this.activeCategories());
    this.getArticles();
    this.render();
    this.inputs.forEach( input => input.addEventListener('change', () => {
      this.setActiveCategory(this.activeCategories());
      this.getArticles();
      this.render();
    }))
  }
}

async function init() {
  getYear();
  const reader = new Articles();
  reader.init();
}
init();
