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

const PHOTOS = [
  'img/avatar-1.svg',
  'img/avatar-2.svg',
  'img/avatar-3.svg',
  'img/avatar-4.svg',
  'img/avatar-5.svg',
  'img/avatar-6.svg',
]

const OBJECT_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createPhotoDescription = () => ({
  id: getRandomInteger(1, 26),
  url: getRandomArrayElement(PHOTOS),
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
});

const newObject = Array.from({length: OBJECT_COUNT}, createPhotoDescription);

console.log(newObject);
