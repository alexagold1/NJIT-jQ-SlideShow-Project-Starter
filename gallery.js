let mCurrentIndex = 0; // Tracks the current image index
let mImages = []; // Array to hold GalleryImage objects
const mUrl = "images.json"; // Replace with actual JSON URL
const mWaitTime = 5000; // Timer interval in milliseconds

$(document).ready(() => {
  // Hide the details section initially
  $(".details").hide();

  // MORE BUTTON: toggle details and rotate indicator
  $(".moreIndicator").click(function () {
    $(this).toggleClass("rot90 rot270"); // rotates the indicator 180 degrees
    $(".details").slideToggle(); // shows/hides the details
  });

  // NEXT BUTTON: show the next photo
  $("#nextPhoto").click(function () {
    showNextPhoto();
  });

  // PREVIOUS BUTTON: show the previous photo
  $("#prevPhoto").click(function () {
    showPrevPhoto();
  });

  // Load the JSON data and display the first image
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

      if (Array.isArray(data)) {
        imageArray = data;
      } else if (data && Array.isArray(data.images)) {
        imageArray = data.images;
      } else if (data && Array.isArray(data.photos)) {
        imageArray = data.photos;
      } else {
        console.warn("Unexpected JSON structure from", mUrl, data);
      }

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
      } else {
        console.error("No images found in JSON response from", mUrl);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Failed to load JSON from", mUrl, textStatus, errorThrown);
    },
  });
}

// Function to swap and display the next photo in the slideshow
function swapPhoto() {
  // Make sure we have at least one image
  if (mImages.length === 0) {
    console.warn("No images to display.");
    return;
  }

  // Get the current image object
  const currentImage = mImages[mCurrentIndex];

  // Update the main photo
  $("#photo").attr("src", currentImage.imgPath);

  // Update metadata
  $("#photo").attr("src", currentImage.imgPath);
  $(".location").text("Location: " + currentImage.imgLocation);
  $(".description").text("Description: " + currentImage.description);
  $(".bestSeason").text("Best Season: " + currentImage.bestSeason);
}

function showNextPhoto() {
  if (mImages.length === 0) return; // safety check

  mCurrentIndex++;
  if (mCurrentIndex >= mImages.length) {
    mCurrentIndex = 0; // loop back to the first image
  }
  swapPhoto();
}
function showPrevPhoto() {
  if (mImages.length === 0) return; // safety check

  mCurrentIndex--;
  if (mCurrentIndex < 0) {
    mCurrentIndex = mImages.length - 1; // loop to the last image
  }
  swapPhoto();
}
