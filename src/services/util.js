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
  Moment.locale('nb');
  const direction = Sort.DESC ? 1 : -1;

  const sortedArray = data.sort((a, b) => {
      const firstDate = Moment.utc(a.date).unix();
      const secondDate = Moment.utc(b.date).unix();

      if (!firstDate) {
          return 1 * direction;
      } else if (!secondDate) {
          return -1 * direction;
      } else {
          return (firstDate - secondDate) * direction;
      }
  });

  return sortedArray;
}
