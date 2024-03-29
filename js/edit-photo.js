const uploadForm = document.querySelector('.img-upload__form');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoImage = photoEditorForm.querySelector('.img-upload__preview img');
const scaleControl = photoEditorForm.querySelector('.scale__control--value');
const sliderContainer = photoEditorForm.querySelector('.img-upload__effect-level');
const effectValue = photoEditorForm.querySelector('.effect-level__value');
const slider = photoEditorForm.querySelector('.effect-level__slider');


let scale = 1;
const SCALE_STEP = 0.25;

const onSmallerBtnclick = () => {
  if (scale > SCALE_STEP) {
    scale -= SCALE_STEP;
    photoImage.style.transform = `scale(${scale})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

const onBiggerBtnBtnclick = () => {
  if (scale < 1) {
    scale += SCALE_STEP;
    photoImage.style.transform = `scale(${scale})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

noUiSlider.create(slider, {
  start: 0,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 1,
  },
  format: {
    to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value)
  },
});

const FILTERS_VALUE = {
  'chrome': {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    FILTER: () => `grayscale(${slider.noUiSlider.get()})`
  },

  'sepia': {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    FILTER: () => `sepia(${slider.noUiSlider.get()})`
  },

  'marvin': {
    MIN: 0,
    MAX: 100,
    STEP: 1,
    FILTER: () => `invert(${slider.noUiSlider.get()}%)`
  },

  'phobos': {
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    FILTER: () => `blur(${slider.noUiSlider.get()}px)`
  },

  'heat': {
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
    FILTER: () => `brightness(${slider.noUiSlider.get()})`
  }
};


function onFilterChange () {
  if (this.value !== 'none') {
    sliderContainer.classList.remove('hidden');

    slider.noUiSlider.updateOptions({
      range: {
        min: FILTERS_VALUE[this.value].MIN,
        max: FILTERS_VALUE[this.value].MAX,
      },
      start: FILTERS_VALUE[this.value].MAX,
      step: FILTERS_VALUE[this.value].STEP,
    });

    slider.noUiSlider.on('update', () => {
      photoImage.style.filter = FILTERS_VALUE[this.value].FILTER();
      effectValue.value = slider.noUiSlider.get();
    });
  } else {
    sliderContainer.classList.add('hidden');
    photoImage.style.filter = '';
  }
}

export {onSmallerBtnclick, onBiggerBtnBtnclick, onFilterChange};

