import {renderPhotos, clearPhotos} from './render-photos.js';
import { debounce } from './util.js';

const filters = document.querySelector('.img-filters');
const filtersForm = filters.querySelector('.img-filters__form');
const filterDefolt = filtersForm.querySelector('#filter-default');
const filterRandom = filtersForm.querySelector('#filter-random');
const filterDiscussed = filtersForm.querySelector('#filter-discussed');
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
let currentFilter = 'filter-default';


let pictures = [];

const debounceRender = debounce(renderPhotos);

const RANDOM_PICTURE_COUNT = 10;

function onFilterSort(evt) {
  const targetButton = evt.target;
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if(!targetButton.matches('button')) {
    return;
  }


  if(activeButton === targetButton) {
    return;
  }

  activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  currentFilter = targetButton.getAttribute('id');

  applyFilter();
}

function applyFilter () {
  let filterPictures = [];
  if (currentFilter === filterDefolt) {
    filterPictures = pictures;
  }

  if (currentFilter === filterRandom) {
    filterPictures = pictures.toSorted(() => 0.5 - Math.random()).slice(0, RANDOM_PICTURE_COUNT);
  }

  if (currentFilter === filterDiscussed) {
    filterPictures = pictures.toSorted((a, b) => b.comments.lenght - a.comments.lenght);
  }
  debounceRender(filterPictures);
}

function configFilter(picturesData) {
  filters.classList.remove('img-filters--inactive');
  filters.addEventListener('click', onFilterSort);
  pictures = picturesData;
}

export { configFilter };
