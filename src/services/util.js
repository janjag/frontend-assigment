import Moment from 'moment';

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
  const direction = order === Sort.DESC ? 1 : -1;

  const sortedArray = data.sort((a, b) => {
      const firstDate = new Moment(a.date);
      const secondDate = new Moment(b.date);

      if (!firstDate.isValid()) {
          return 1 * direction;
      } else if (!secondDate.isValid()) {
          return -1 * direction;
      } else {
          const diff = firstDate.toDate().getTime() - secondDate.toDate().getTime();
          return diff === 0 ? 0 : diff * direction;
      }
  });

  console.log(sortedArray)
  return sortedArray;
}
