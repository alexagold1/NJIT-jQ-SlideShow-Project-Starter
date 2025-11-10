let mCurrentIndex = 0; // Tracks the current image index
let mImages = []; // Array to hold GalleryImage objects
const mUrl = "https://your-json-url.com"; // Replace with actual JSON URL
const mWaitTime = 5000; // Timer interval in milliseconds

$(document).ready(() => {
  $(".details").hide(); // Hide details initially

  // Call a function here to start the timer for the slideshow

  // Select the moreIndicator button and add a click event to:
  // - toggle the rotation classes (rot90 and rot270)
  // - slideToggle the visibility of the .details section

  // Select the "Next Photo" button and add a click event to call showNextPhoto

  // Select the "Previous Photo" button and add a click event to call showPrevPhoto

  // Call fetchJSON() to load the initial set of images
  fetchJSON();
});

// Function to fetch JSON data and store it in mImages
function fetchJSON() {
  // Function to fetch JSON data and store it in mImages
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
              imgLocation:
                item.imgLocation || item.location || item.place || "",
              description: item.description || item.desc || "",
              date: item.date || item.imgDate || "",
            };
            mImages.push(img);
          });

          mCurrentIndex = 0;
          swapPhoto();
        } else {
          console.error("No images found in JSON response from", mUrl);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error(
          "Failed to load JSON from",
          mUrl,
          textStatus,
          errorThrown
        );
      },
    });
  }
}

// Function to swap and display the next photo in the slideshow
function swapPhoto() {
  // Access mImages[mCurrentIndex] to update the image source and details
  // Update the #photo element's src attribute with the current image's path
  // Update the .location, .description, and .date elements with the current image's details
}

// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto() {
  // Increment mCurrentIndex and call swapPhoto()
  // Ensure it loops back to the beginning if mCurrentIndex exceeds array length
}

// Goes to the previous photo, loops to the last photo if mCurrentIndex goes negative
function showPrevPhoto() {
  // Decrement mCurrentIndex and call swapPhoto()
  // Ensure it loops to the end if mCurrentIndex is less than 0
}

// Starter code for the timer function
function startTimer() {
  // Create a timer to automatically call `showNextPhoto()` every mWaitTime milliseconds
  // Consider using setInterval to achieve this functionality
  // Hint: Make sure only one timer runs at a time
}
