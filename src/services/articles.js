import { Category } from './util';

export const apiURLTemplate = cat => `http://localhost:6010/articles/${cat}`;

export function getArticles( cat = Category.ALL) {
  let categories = [];

  if (cat === Category.ALL) {
    categories = Object.values(Category)
      .filter( value => value !== Category.ALL );
  } else {
    if (Array.isArray(cat)) {
      cat.map( element => categories.push(element))
    } else {
      categories.push(cat);
    }
  }

  return Promise.all(categories.map( value => fetch(apiURLTemplate(value))))
    .then( responses => {
      return Promise.all(
        responses.map( response => response.json())
      )
    })
    .then( packs => {
      return packs.map( pack => pack.articles)
        .reduce((acc, curr) => {
          return [
            ...acc,
            ...curr
          ]
        }, [])
    });
}
