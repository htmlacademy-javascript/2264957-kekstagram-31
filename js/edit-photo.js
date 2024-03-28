import { uploadForm } from './form.js';

const scaleControl = uploadForm.querySelector('.scale__control--value');
const photoPreview = uploadForm.querySelector('.img-upload__preview img');


let scale = 1;
const SCALE_STEP = 0.25;

const onSmallerBtnclick = () => {
  if (scale > SCALE_STEP) {
    scale -= SCALE_STEP;
    photoPreview.style.transform = 'scale(${scale})';
    scaleControl.value = '${scale * 100}%';
  }
};

const onBiggerBtnBtnclick = () => {
  if (scale < 1) {
    scale += SCALE_STEP;
    photoPreview.style.transform = 'scale(${scale})';
    scaleControl.value = '${scale * 100}%';
  }
};

export {onSmallerBtnclick, onBiggerBtnBtnclick};

