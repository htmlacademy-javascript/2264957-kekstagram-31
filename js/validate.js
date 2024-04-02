import { showAlertSend, showSuccessSend, isEscapeKey } from './util';
import { sendData } from './api.js';

const uploadForm = document.querySelector('.img-upload__form');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const submitBtn = uploadForm.querySelector('#upload-submit');

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const COMMENT_ERROR_MESSAGE = 'Длина комментария больше 140 символов';
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...'
};

let infoModal;

let errorMessage = '';

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextTag: 'div',
});

const error = () => errorMessage;

const isHashtagsValid = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if(!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Введён невалидный хэштег'
    },
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хештег не может состоять из одной решетки'
    },
    {
      check: inputArray.length > MAX_HASHTAG_COUNT,
      error: 'Превышено количество хэштегов'
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хэштеги повторяются'
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэштег содержит недопустимые символы'
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if(isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

const isCommentValid = (value) => value.length <= MAX_COMMENT_LENGTH;


pristine.addValidator(hashtagInput, isHashtagsValid, error);

pristine.addValidator(commentInput, isCommentValid, COMMENT_ERROR_MESSAGE);

const blockSubmitButton = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = SubmitButtonText.IDLE;
};

const onDocumentKeydown = () => {
  if (isEscapeKey) {
    closeInfoModal();
  }
};

function closeInfoModal() {
  infoModal.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
}

const setUserFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValidate = pristine.validate();
    if (isValidate) {
      blockSubmitButton();
      sendData(new FormData(evt.target)).then(onSuccess).then(() => {
        showSuccessSend();
      })
        .catch(() => {
          showAlertSend();
        })
        .finally(() => {
          unblockSubmitButton();
        });
    }
  });
};

const onFormSubmit = (evt) => {
  evt.prevenrDefolt();
  pristine.validate();
};

export {onFormSubmit, setUserFormSubmit};
