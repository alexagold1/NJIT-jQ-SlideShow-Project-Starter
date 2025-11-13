let mCurrentIndex = 0; // Tracks the current image index
let mImages = []; // Array to hold GalleryImage objects
const mUrl = "images.json"; // Replace with actual JSON URL
const mWaitTime = 5000; // Timer interval in milliseconds

let slideshowTimer = null; // store the timer ID

$(document).ready(() => {
  $(".details").hide();

  $(".moreIndicator").click(function () {
    $(this).toggleClass("rot90 rot270");
    $(".details").slideToggle();
  });

  $("#nextPhoto").click(function () {
    showNextPhoto();
    resetTimer(); // restart timer after manual click
  });

  $("#prevPhoto").click(function () {
    showPrevPhoto();
    resetTimer(); // restart timer after manual click
  });

  fetchJSON();
});

function fetchJSON() {
  mImages = [];

  $.ajax({
    url: mUrl,
    method: "GET",
    dataType: "json",
    cache: false,
    success: function (data) {
      let imageArray = null;

      if (Array.isArray(data)) imageArray = data;
      else if (data && Array.isArray(data.images)) imageArray = data.images;
      else if (data && Array.isArray(data.photos)) imageArray = data.photos;

      if (imageArray && imageArray.length > 0) {
        imageArray.forEach((item) => {
          const img = {
            imgPath: item.imgPath || item.path || item.url || item.src || "",
            imgLocation: item.imgLocation || item.location || item.place || "",
            description: item.description || item.desc || "",
            bestSeason: item.bestSeason || item.season || "",
          };
          mImages.push(img);
        });

        // Display the first image immediately
        mCurrentIndex = 0;
        swapPhoto();

        startTimer();
      } else {
        console.error("No images found in JSON response from", mUrl);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Failed to load JSON from", mUrl, textStatus, errorThrown);
    },
  });
}

function swapPhoto() {
  if (mImages.length === 0) return;
  const currentImage = mImages[mCurrentIndex];

  $("#photo").attr("src", currentImage.imgPath);
  $(".location").text("Location: " + currentImage.imgLocation);
  $(".description").text("Description: " + currentImage.description);
  $(".bestSeason").text("Best Season: " + currentImage.bestSeason);
}

function showNextPhoto() {
  if (mImages.length === 0) return;
  mCurrentIndex = (mCurrentIndex + 1) % mImages.length;
  swapPhoto();
}

function showPrevPhoto() {
  if (mImages.length === 0) return;
  mCurrentIndex = (mCurrentIndex - 1 + mImages.length) % mImages.length;
  swapPhoto();
}

function startTimer() {
  if (slideshowTimer !== null) clearInterval(slideshowTimer);
  slideshowTimer = setInterval(showNextPhoto, mWaitTime);
}

// Reset timer after manual click
function resetTimer() {
  if (slideshowTimer !== null) clearInterval(slideshowTimer);
  slideshowTimer = setInterval(showNextPhoto, mWaitTime);
}
