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
let success;
let error;

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

const onErrorButtonClick = () => {
  document.body.removeChild(error);
};

const showAlertSend = () => {
  error = errorSendTemplate.cloneNode(true);
  const errorBtn = error.querySelector('.error__button');

  errorSendFragment.append(error);
  body.append(errorSendFragment);

  errorBtn.addEventListener('click', onErrorButtonClick);
  document.addEventListener('click', onErrorDocumentClick);
  document.addEventListener('keydown', onEventKeydown);

  setTimeout(() => {
    error.remove();
  }, ALERT_SHOWTIME);

};


const showAlertGet = () => {
  error = errorGetTemplate.cloneNode(true);

  errorGetFragment.append(error);
  body.append(errorSendFragment);

  setTimeout(() => {
    error.remove();
  }, ALERT_SHOWTIME);
};

const onSuccessButtonClick = () => {
  document.body.removeChild(success);
};


const showSuccessSend = () => {
  success = successGetTemplate.cloneNode(true);
  const successBtn = success.querySelector('.success__button');

  successGetFragment.append(success);
  body.append(success);

  successBtn.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('click', onSuccessDocumentClick);
  document.addEventListener('keydown', onEventKeydown);
};

const closeSuccesSend = () => {
  document.body.removeChild(success);
  document.removeEventListener('click', onSuccessDocumentClick);
  document.removeEventListener('keydown', onEventKeydown);
};

const closeError = () => {
  document.body.removeChild(error);
  document.removeEventListener('click', onErrorDocumentClick);
  document.removeEventListener('keydown', onEventKeydown);
};

function onEventKeydown (evt) {
  if (isEscapeKey(evt)) {
    closeSuccesSend();
  }
}

function onSuccessDocumentClick (evt) {
  if (evt.target === success) {
    closeSuccesSend();
  }
}

function onErrorDocumentClick (evt) {
  if (evt.target === error) {
    closeError();
  }
}

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
