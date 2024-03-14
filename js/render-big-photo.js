import { createPhoto } from './create-miniatures.js';

const picturesList = document.querySelector('.big-picture__preview');
const pictureTemplate = document.querySelector('#big-picture__preview').content.querySelector('.big-picture__preview');

const pictures = createPhoto();
const picturesFragment = document.createDocumentFragment();

const renderBigPhotos = () => {
  pictures.forEach(({
    url,
    description,
    likes,
    comments
  }) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    const pictureImage = pictureElement.querySelector('.picture__img');

    pictureElement.querySelector('.big-picture__img').src = url;
    pictureImage.alt = description;
    pictureElement.querySelector('.likes-count').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    picturesFragment.append(pictureElement);
  });

  picturesList.append(picturesFragment);
};

export { renderBigPhotos };
