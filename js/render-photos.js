// import { createPhoto } from './create-miniatures.js';
import { showBigPicture } from './open-picture.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// const pictures = createPhoto();
const picturesFragment = document.createDocumentFragment();

const clearPhotos = () => picturesList.querySelectorAll('.picture').forEach((item) => item.remove());


const renderPhotos = (pictures) => {
  pictures.forEach(({
    url,
    description,
    likes,
    comments
  }) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    const pictureImage = pictureElement.querySelector('.picture__img');

    pictureImage.src = url;
    pictureImage.alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.addEventListener('click', () => {
      showBigPicture({url, description, likes, comments });
    });

    picturesFragment.append(pictureElement);
  });

  picturesList.append(picturesFragment);
};


export { renderPhotos, clearPhotos };
