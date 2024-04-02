import {
  renderPhotos
} from './render-photos.js';

import {loadImage} from './form.js';

import {getData} from './api.js';
import {showAlertGet} from './util.js';


getData()
  .then((pictures) => {
    renderPhotos(pictures);
  })
  .catch(
    () => {
      showAlertGet();
    }
  );

// renderPhotos();
loadImage();
