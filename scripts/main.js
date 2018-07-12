var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]'
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]'
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]'
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var DETAIL_FRAME_SLIDER = '[class="detail-img-slider"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
var thumbnailIndex = 0;
var thumbnailArray;

function getSliderArray() {
  'use strict';
  var sliders = document.querySelectorAll(DETAIL_FRAME_SLIDER);
  var sliderArray = [].slice.call(sliders);
  return sliderArray;
}

function addSliderClickHandler(slider){
  'use strict';
  slider.addEventListener('click', function (event) {
    event.preventDefault();
    if (slider.getAttribute('data-image-role') === "previousImg") {
      if(thumbnailIndex <= 0)
      {
        setDetailsFromThumb(thumbnailArray[4]);
        thumbnailIndex = 4;
      }
      else
      {
        setDetailsFromThumb(thumbnailArray[thumbnailIndex = thumbnailIndex - 1]);
      }
    } else {
      if(thumbnailIndex >= 4)
      {
        setDetailsFromThumb(thumbnailArray[0]);
        thumbnailIndex = 0;
      }
      else
      {
        setDetailsFromThumb(thumbnailArray[thumbnailIndex = thumbnailIndex + 1]);
      }
    }
  });
}

function hideDetails() {
  'use strict';
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
  'use strict';
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function () {
    frame.classList.remove(TINY_EFFECT_CLASS);
  },50);
}

function addKeyPressHandler() {
  'use strict';
  document.body.addEventListener('keyup', function (event) {
    event.preventDefault();
    if (event.keyCode === ESC_KEY) {
      hideDetails();
    }
  });
}

function setDetails (imageURL, titleText) {
  'use strict';
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageURL);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb (thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb (thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  'use strict';
  thumb.addEventListener('click', function (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
    showDetails();
  });
}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  thumbnailArray = [].slice.call(thumbnails);
}

function initializeEvents() {
  'use strict';
  getThumbnailsArray();
  thumbnailArray.forEach(addThumbClickHandler);
  addKeyPressHandler();
  var sliderArray = getSliderArray();
  sliderArray.forEach(addSliderClickHandler);
}

initializeEvents();
