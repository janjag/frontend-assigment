export const getYear = () => document.querySelector('.year-now').innerHTML = new Date().getFullYear();

export const inputs = document.querySelectorAll('.category .checkbox');

export const Category = {
  ALL: 'all',
  FASHION: 'fashion',
  SPORTS: 'sports'
}
