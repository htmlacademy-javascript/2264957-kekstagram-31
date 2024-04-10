import {
  isEscapeKey
} from './util.js';

const userModalPicture = document.querySelector('.big-picture');
const userModalClosePicture = userModalPicture.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const commentTemplate = document.querySelector('#social-comment').content;
const commentSection = userModalPicture.querySelector('.social__comments');
const commentsShowCount = userModalPicture.querySelector('.social__comment-shown-count');
const commentsTotalCount = userModalPicture.querySelector('.social__comment-total-count');
const commentsLoad = userModalPicture.querySelector('.comments-loader');
const MIN_SHOW_COMMENTS = 5;
let currentComments = [];
let startCommentsCount = 0;
let commentsForRender = [];


const clearComments = () => {
  startCommentsCount = 0;
  commentSection.innerHTML = '';
  commentsForRender = [];
};

const renderPictureComments = () => {
  commentsForRender = currentComments.slice(startCommentsCount, startCommentsCount + MIN_SHOW_COMMENTS);
  startCommentsCount += MIN_SHOW_COMMENTS;
  const commentsFragment = document.createDocumentFragment();
  commentsForRender.forEach(({
    avatar,
    message,
    name
  }) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__text').textContent = message;
    commentsFragment.append(comment);
  });
  commentSection.append(commentsFragment);
  commentsShowCount.textContent = commentSection.children.length;
  if (currentComments.length === commentSection.children.length) {
    commentsLoad.classList.add('hidden');
  }
};


const renderBigPicture = ({
  url,
  description,
  likes,
  comments
}) => {
  userModalPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  userModalPicture.querySelector('.big-picture__img').querySelector('img').alt = description;
  userModalPicture.querySelector('.likes-count').textContent = likes;
  userModalPicture.querySelector('.social__caption').textContent = description;
  commentsTotalCount.textContent = comments.length;
  if (comments.length > MIN_SHOW_COMMENTS) {
    commentsLoad.addEventListener('click', renderPictureComments);
  }
  currentComments = comments;
  renderPictureComments();
};

const closeBigPicture = () => {
  clearComments();
  userModalPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPictureEscapeKeyDown);
  commentsLoad.classList.remove('hidden');
  commentsLoad.removeEventListener('click', renderPictureComments);
};

const onPictureEscapeKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const showBigPicture = ({
  url,
  description,
  likes,
  comments
}) => {
  userModalPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPictureEscapeKeyDown);
  renderBigPicture({
    url,
    description,
    likes,
    comments
  });
  userModalClosePicture.addEventListener('click', closeBigPicture);
};


export {
  showBigPicture,
  closeBigPicture,
  body
};
