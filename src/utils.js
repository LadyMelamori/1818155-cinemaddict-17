import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getDateYear = (date) => dayjs(date).format('YYYY');

const humanizeRuntime = (runtimeMinutes) => `${Math.floor(runtimeMinutes / 60)}h ${runtimeMinutes % 60}m`;

const shortenDescription = (description) => description.length > 140 ? `${description.slice(0, 139)}...` : description;

const humanizeReleaseDate = (date) => dayjs(date).format('D MMMM YYYY');

const humanizeCommentDate = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');

export { getRandomInteger, getDateYear, humanizeRuntime, shortenDescription, humanizeReleaseDate, humanizeCommentDate };
