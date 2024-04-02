import {
  body
} from './open-picture';

const errorSendTemplate = document.querySelector('#error').content.querySelector('.error');
const errorSendFragment = document.createDocumentFragment();
const errorGetTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const errorGetFragment = document.createDocumentFragment();
const successGetTemplate = document.querySelector('#success').content.querySelector('.success');
const successGetFragment = document.createDocumentFragment();
const ALERT_SHOWTIME = 5000;
let photos = [];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const isEscapeKey = (evt) => {
  return evt.key === 'Escape'
};

const savePhotos = (photosArrey) => {
  photos = photosArrey;
};

const showAlertSend = () => {
  const error = errorSendTemplate.cloneNode(true);

  errorSendFragment.append(error);
  body.append(errorSendFragment);
};

const showAlertGet = () => {
  const error = errorGetTemplate.cloneNode(true);

  errorGetFragment.append(error);
  body.append(errorSendFragment);

  setTimeout(() => {
    error.remove();
  }, ALERT_SHOWTIME);
};

const showSuccessSend = () => {
  const success = successGetTemplate.cloneNode(true);

  successGetFragment.append(success);
  body.append(success);
};

export {
  getRandomInteger,
  createRandomIdFromRangeGenerator,
  isEscapeKey,
  showAlertSend,
  showAlertGet,
  showSuccessSend,
  savePhotos,
  photos
};
