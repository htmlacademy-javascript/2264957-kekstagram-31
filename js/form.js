import { isEscapeKey } from './util';
import { body } from './open-picture';
import { onFormSubmit } from './validate';

const uploadForm = document.querySelector('.img-upload__form');

const upLoadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');


const onPhotoEditorResetBtnClick = () => closePhotoEditor();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefolt();
    if(document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      uploadForm.reset();
      closePhotoEditor();
    }
  }
};

function closePhotoEditor () {
  photoEditorForm.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.removeEventListener('submit', onFormSubmit);
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
  upLoadFileControl.value = '';
}

export const loadImage = () => {
  upLoadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    body.classList.add('modal-open');
    uploadForm.addEventListener('submit', onFormSubmit);
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
  });
};

