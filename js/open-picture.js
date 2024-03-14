
import { isEscapeKey, isEnterKey } from './util.js';
import { renderBigPhotos } from './render-big-photo.js';

const userModalPicture = document.querySelector('.big-picture');
const userModalOpenPicture = userModalPicture.querySelector('.big-picture__preview');
const userModalClosePicture = userModalPicture.querySelector('.picture-cancel');

const onPictureEscapeKeyDown = (evt) => {
  if (isEscapeKey.evt) {
    evt.preventDefault();
    userModalPicture.classList.add('hidden');
  }
};

const showBigpicture = () => {
  userModalPicture.classList.remove('hidden');
  document.addEventListener('keydown', onPictureEscapeKeyDown);
  renderBigPhotos();
};

const closeBigpicture = () => {
  userModalPicture.classList.add('hidden');
};

userModalOpenPicture.addEventListener('click', () => {
  showBigpicture();
});

userModalClosePicture.addEventListener('click', () => {
  closeBigpicture();
});


document.addEventListener('keydown', (evt) => {
  if (isEnterKey.evt) {
    evt.preventDefault();
    userModalPicture.classList.add('hidden');
  }
});


