import Moment from 'moment';

Moment.locale('nb');

export const getYear = () => document.querySelector('.year-now').innerHTML = new Date().getFullYear();

export const filters = document.querySelectorAll('.category .checkbox');

export const sortOptions = document.querySelectorAll('.sorting .checkbox');

export const Category = {
  ALL: 'all',
  FASHION: 'fashion',
  SPORTS: 'sports'
}

export const Sort = {
  DESC: 'desc',
  ASC: 'asc'
}

export function sortByDate(data = [], order = Sort.DESC) {
  const sortedArray = data.sort((a,b) => new Moment(a.date).format('YYYYMMDD') - new Moment(b.date).format('YYYYMMDD'))

  console.log(sortedArray)
  return sortedArray;
}
