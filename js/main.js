import {
  renderPhotos
} from './render-photos.js';
import {
  loadImage
} from './form.js';
import {
  getData
} from './api.js';
import {
  showAlertGet
} from './util.js';
import {
  setUserFormSubmit
} from './validate';
import {
  closePhotoEditor
} from './form.js';
import {
  configFilter
} from './filter.js';


getData()
  .then((pictures) => {
    renderPhotos(pictures);
    configFilter(pictures);
  })
  .catch(
    () => {
      showAlertGet('Не удалось загрузить данные');
    }
  );

loadImage();
setUserFormSubmit(closePhotoEditor);
