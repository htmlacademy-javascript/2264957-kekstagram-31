import { createComments } from './create-miniatures.js';
import { isEscapeKey } from './util.js';

const userModalPicture = document.querySelector('.big-picture');
const userModalClosePicture = userModalPicture.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const commentTemplate = userModalPicture.querySelector('social__comment');
const commentSection = userModalPicture.querySelector('.social__comments');
const commentsShowCount = userModalPicture.querySelector('.social__comment-shown-count');
const commentsTotalCount = userModalPicture.querySelector('.social__comment-total-count');
const commentsElement = createComments();

const onPictureEscapeKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    userModalPicture.classList.add('hidden');
  }
};

const closeBigPicture = () => {
  userModalPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPictureEscapeKeyDown);
};


const renderPictureComments = (comments) => {
  commentsElement.forEach(({ avatar, message }) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__pictures').src = avatar;
    comment.querySelector('.social__text').textContent = message;
    commentsShowCount.textContent = comments.length;
    commentsTotalCount.textContent = comments.length;
    commentSection.appendChild(comment);
  });
};

const renderBigPicture = ({url, description, likes, comments }) => {
  userModalPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  userModalPicture.querySelector('.big-picture__img').querySelector('img').alt = description;
  userModalPicture.querySelector('.likes-count').textContent = likes;
  userModalPicture.querySelector('.likes-count').textContent = description;
  userModalPicture.querySelector('.social__caption').textContent = description;
  renderPictureComments(comments);
};

const showBigPicture = ({url, description, likes, comments }) => {
  userModalPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPictureEscapeKeyDown);
  renderBigPicture ({url, description, likes, comments });
  userModalClosePicture.addEventListener('click', () => {
    closeBigPicture();
  });
};

export { showBigPicture, closeBigPicture };
