
import { isEscapeKey } from './util.js';

const userModalPicture = document.querySelector('.big-picture');
const userModalClosePicture = userModalPicture.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const commentTemplate = userModalPicture.querySelector('.social__comment');
const commentSection = userModalPicture.querySelector('.social__comments');
const commentsShowCount = userModalPicture.querySelector('.social__comment-shown-count');
const commentsTotalCount = userModalPicture.querySelector('.social__comment-total-count');
const commentsLoad = userModalPicture.querySelector('.comments-loader');
const MIN_SHOW_COMMENTS = 5;
let startCommentsCount = 0;
let commentsForRender = [];

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

const renderPictureComments = () => {
  const comments = commentsForRender.slice(startCommentsCount, startCommentsCount + MIN_SHOW_COMMENTS);
  const commentsFragment = document.createDocumentFragment();
  comments.forEach(({ avatar, message }) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__text').textContent = message;
    commentsShowCount.textContent = comments.length;
    commentsTotalCount.textContent = comments.length;
    commentsFragment.append(comment);
  });
  commentSection.append(commentsFragment);
  if (comments.length < MIN_SHOW_COMMENTS) {
    commentsShowCount.textContent = comments.length;
  } else {
    commentsShowCount.textContent = MIN_SHOW_COMMENTS;
  }
  startCommentsCount += MIN_SHOW_COMMENTS;
  commentsShowCount.textContent = startCommentsCount;
  if (commentsForRender.length === commentSection.children.length) {
    commentsShowCount.textContent = commentSection.children.length;
    commentsLoad.classList.add('hidden');
  }
};

const loadNextComments = (commentsArrey) => {
  commentsForRender = commentsArrey;
  renderPictureComments();
  commentsLoad.addEventListener('click', renderPictureComments());
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
  commentSection.innerHTML = '';
  renderBigPicture ({url, description, likes, comments });
  commentsTotalCount.textContent = comments.length;
  loadNextComments(comments);
  userModalClosePicture.addEventListener('click', () => {
    closeBigPicture();
  });
};

export { showBigPicture, closeBigPicture };
