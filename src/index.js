// Function to fetch data from the JSON server and display ramen menu
async function fetchRamens() {
  try {
    const response = await fetch('http://localhost:3000/ramens'); // Adjust the URL if needed
    const ramens = await response.json();

    const ramenMenuDiv = document.getElementById('ramen-menu');
    
    ramens.forEach(ramen => {
      // Create a new image element for each ramen item
      const ramenImg = document.createElement('img');
      ramenImg.src = ramen.image;  // Set the source of the image from the JSON data
      ramenImg.alt = ramen.name;   // Set alt text for accessibility
      ramenImg.classList.add('ramen-img');  // Optionally add a class for styling

      // Add event listener to show details when clicked
      ramenImg.addEventListener('click', () => displayRamenDetails(ramen));

      // Append the image to the ramen menu container
      ramenMenuDiv.appendChild(ramenImg);
    });
  } catch (error) {
    console.error('Error fetching ramens:', error);
  }
}

// Function to display ramen details when clicked
function displayRamenDetails(ramen) {
  const ramenDetailDiv = document.getElementById('ramen-detail');
  const detailImage = ramenDetailDiv.querySelector('.detail-image');
  const nameElement = ramenDetailDiv.querySelector('.name');
  const restaurantElement = ramenDetailDiv.querySelector('.restaurant');
  const ratingDisplay = document.getElementById('rating-display');
  const commentDisplay = document.getElementById('comment-display');

  // Update ramen details
  detailImage.src = ramen.image;
  nameElement.textContent = ramen.name;
  restaurantElement.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
}

// Handle form submission
const addSubmitListener = (form) => {
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get all the form elements
    const nameElement = document.getElementById('new-name');
    const restaurantElement = document.getElementById('new-restaurant');
    const imageElement = document.getElementById('new-image');
    const ratingElement = document.getElementById('new-rating');
    const commentElement = document.getElementById('new-comment');

    // Ensure all elements exist
    if (nameElement && restaurantElement && imageElement && ratingElement && commentElement) {
      const name = nameElement.value;
      const restaurant = restaurantElement.value;
      const image = imageElement.value;
      const rating = ratingElement.value;
      const comment = commentElement.value;

      const newRamen = {
        name: name,
        restaurant: restaurant,
        image: image, // Fixed to `image` here
        rating: rating || 5, // Default to 5 if no rating
        comment: comment || 'No comment provided', // Default comment if empty
      };

      // Add the new ramen to the #ramen-menu div
      const ramenMenu = document.getElementById('ramen-menu');
      const ramenImage = document.createElement('img');
      ramenImage.src = newRamen.image;
      ramenImage.alt = newRamen.name;
      ramenImage.addEventListener('click', () => handleClick(newRamen));  // Add event listener
      ramenMenu.appendChild(ramenImage);

      // Reset the form after submission
      form.reset();
    } else {
      console.error('One or more form elements are missing.');
    }
  });
};

// Handle ramen image click event
const handleClick = (ramen) => {
  const ramenName = document.getElementById('ramen-name');
  const ramenImage = document.getElementById('ramen-image');
  const ramenComment = document.getElementById('ramen-comment');
  const ramenRating = document.getElementById('ramen-rating');
  const ramenRestaurant = document.getElementById('ramen-restaurant');

  if (ramenName && ramenImage && ramenComment && ramenRating && ramenRestaurant) {
    ramenName.textContent = ramen.name;
    ramenRestaurant.textContent = ramen.restaurant;
    ramenImage.src = ramen.image;
    ramenImage.alt = ramen.name;
    ramenComment.textContent = ramen.comment;
    ramenRating.textContent = `Rating: ${ramen.rating}`;
  } else {
    console.error('One or more elements are missing.');
  }
};

// Load all ramen items when the page loads
const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the JSON data
    })
    .then(ramens => {
      const ramenMenu = document.getElementById('ramen-menu');
      ramenMenu.innerHTML = ""; // Clear any existing content

      ramens.forEach(ramen => {
        const ramenImage = document.createElement('img');
        ramenImage.src = ramen.image; // Standardized key `image`
        ramenImage.alt = ramen.name;
        ramenImage.addEventListener('click', () => handleClick(ramen));
        ramenMenu.appendChild(ramenImage);
      });

      // Display the first ramen details when the data is loaded
      if (ramens.length > 0) {
        handleClick(ramens[0]);
      }
    })
    .catch(error => console.error("Error fetching ramens:", error));
};

// Ensure everything is loaded before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('new-ramen');
  if (form) {
    addSubmitListener(form);  // Attach submit listener to form
  } else {
    console.error('Form element not found!');
  }

  displayRamens();  // Display ramen images when the page loads
});
