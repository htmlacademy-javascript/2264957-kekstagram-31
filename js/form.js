import {
  isEscapeKey
} from './util';
import {
  body
} from './open-picture';
import {
  onSmallerBtnclick,
  onBiggerBtnBtnclick,
  onFilterChange,
  resetNoUiSlider
} from './edit-photo.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');

const upLoadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const smallerBtn = uploadForm.querySelector('.scale__control--smaller');
const biggerBtn = uploadForm.querySelector('.scale__control--bigger');
const filters = photoEditorForm.querySelectorAll('[name="effect"]');

const uploadPreview = uploadForm.querySelector('.img-upload__preview img');


const FILE_TYPES = ['jpg', 'jpeg', 'png'];


const onPhotoEditorResetBtnClick = () => closePhotoEditor();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !document.querySelector('.error')) {
    evt.preventDefault();
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      closePhotoEditor();
    }
  }
};

function closePhotoEditor() {
  photoEditorForm.classList.add('hidden');
  body.classList.remove('modal-open');
  filters.forEach((filter) => {
    filter.removeEventListener('change', onFilterChange);
  });
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
  smallerBtn.removeEventListener('click', onSmallerBtnclick);
  biggerBtn.removeEventListener('click', onBiggerBtnBtnclick);
  upLoadFileControl.value = '';
  uploadForm.reset();
  document.querySelectorAll('.img-upload__field-wrapper--error').forEach((item) => {
    item.remove();
  });
  resetNoUiSlider();
}


export const loadImage = () => {
  upLoadFileControl.addEventListener('change', () => {
    const file = uploadInput.files[0];
    const fileName = file.name.toLowerCase();
    const fileExt = fileName.split('.').pop();
    const matches = FILE_TYPES.includes(fileExt);

    if (matches) {
      const url = URL.createObjectURL(file);
      uploadPreview.src = url;
      document.addEventListener('keydown', onDocumentKeydown);
      photoEditorForm.classList.remove('hidden');
      body.classList.add('modal-open');
      filters.forEach((filter) => {
        filter.parentNode.querySelector(
          '.effects__preview'
        ).style.backgroundImage = `url(${url})`;
        filter.addEventListener('change', onFilterChange);
      });
      photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
      smallerBtn.addEventListener('click', onSmallerBtnclick);
      biggerBtn.addEventListener('click', onBiggerBtnBtnclick);
    }
  });
};

export {
  closePhotoEditor
};
