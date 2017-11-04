class ImageMaker {
  constructor() {

    // Point attributes to point at HTML elements
    // TODO: Select the `#image-preview` div using any document selector method.
    this.imagePreview = document.getElementById('image-preview');

    // New 'p' and element called 'this.topText'
    this.topText = document.createElement('p');


    // Added a `class` attribute to `this.topText` that contains the classname "top-text".
    this.topText.setAttribute('class', 'top-text');

    // Added `this.topText` as a child element to `this.imagePreview`
    this.imagePreview.appendChild(this.topText);

    // Created another new `<p>` element called `this.bottomText`
    this.bottomText = document.createElement('p');

    // Added a `class` attribute to `this.bottomText` that contains the classname "bottom-text".
    this.bottomText.setAttribute('class', 'bottom-text');

    // Added `this.bottomText` as a child element to `this.imagePreview`
    this.imagePreview.appendChild(this.bottomText);

    // Select `input` element with the `name` attribute "backgroundImage"
    this.backgroundInput = document.querySelector('select[name="backgroundImage"]');

    // Select  `input` element with the `name` attribute "topText"
    this.topTextInput = document.querySelector('input[name="topText"]');

    //  Select  `input` element with the `name` attribute "bottomText"
    this.bottomTextInput = document.querySelector('input[name="bottomText"]');

    //Images
  }
  drawPreview() {
    // This function is called whenever a user changes one of the form fields
    // and whenever an image is generated for download. This function must
    // update the style attributes and innerHTML content of the HTML
    // elements selected in the `constructor()` of this class in order to
    // update `this.imagePreview`.

    // CSS: Updated the `background-image` CSS property for `this.imagePreview`.
    this.imagePreview.style.backgroundImage = `url(images/${this.backgroundInput.value})`;

    // InnerHTML: Updatde the `innerHTML` of `this.topText`.
    this.topText.innerHTML = this.topTextInput.value;

    // InnerHTML: Updated the `innerHTML` of `this.bottomText`
    this.bottomText.innerHTML = this.bottomTextInput.value;

  }
  downloadImage() {
    this.drawPreview();
    generateImage();
  }
}

let imageMaker = new ImageMaker();

// This function uses the `domtoimage` module to render an image of the
// `#image-preview` element and prompts the user to download the created image.
// It is possible to use the `height` and `width` parameters to alter the size
// of the rendered image.
function generateImage(elementID = "image-preview", height = "800px", width = "1280px") {
  let htmlTemplate = document.getElementById(elementID);
  htmlTemplate.style.height = height;
  htmlTemplate.style.width = width;
  let imageName = "image_" + Date.now();

  // Generate image and prompt download for user.
  domtoimage.toJpeg(htmlTemplate, {
      quality: 0.95
    })
    .then(function(dataUrl) {
      var link = document.createElement('a');
      link.download = imageName;
      link.href = dataUrl;
      link.click();
    });
}


// This function creates event listeners for each every form field added to
// the image maker form as well as the submit button that generates an image
// for download. New form inputs can be created and will automatically have
// a "change" listener added to them.
//
// The form field listeners look for a "change" event and call the
// `imageMaker.drawPreview()` method.
//
// The submit listener on the form interrupts the regular form processing of the
// browser and calls the `imageMaker.downloadImage()` method.
function applyEventListeners() {
  let inputs = document.querySelectorAll('input, select, textarea');
  for (input of inputs) {
    input.addEventListener("change", function(event) {
      imageMaker.drawPreview();
    })
  }
  let imageForm = document.querySelector('form');
  imageForm.addEventListener('submit', function(event) {
    event.preventDefault();
    imageMaker.downloadImage();
  })
}

// Apply event listeners on page load.
applyEventListeners();