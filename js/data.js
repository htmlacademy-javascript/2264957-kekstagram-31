import {getRandomInteger} from './util.js';
import {createRandomIdFromRangeGenerator} from './util.js';

const DESCRIPTIONS = [
  'Лето',
  'Настроение',
  'Зима',
  'Весна',
  'Осень',
  'Ночь',
  'День',
  'Рай',
  'Ад',
  'Луг',
  'Море',
  'Картина',
  'Живопись',
  'Жара',
  'Холод'
];


const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Маша',
  'Даша',
  'Галина',
  'Марина',
  'Саша',
  'Антон',
  'Тимур',
  'Артур',
  'Аня',
  'Маня',
  'Вера',
  'Надя',
  'Рита',
];

const OBJECT_COUNT = 25;


const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
const getPhotoID = createRandomIdFromRangeGenerator(1, 26);
const generateCommentId = createRandomIdFromRangeGenerator(1, 300);
const getNumberPhoto = createRandomIdFromRangeGenerator(1, 26);

const createComments = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES)
});


const createPhoto = () => ({
  id: getPhotoID(),
  url: `photos/${ getNumberPhoto() }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, createComments)
});

const newObject = Array.from({length: OBJECT_COUNT}, createPhoto);

console.log(newObject);

export {createPhoto};
