// Initialize an empty array to hold suggestions
let suggestions = [];

// Fetch the suggestions from a file and process the data
fetch("classes.txt")
  .then(response => response.text()) // Get the text content from the response
  .then(data => {
    // Process the data into an array of trimmed suggestions
    suggestions = data
      .split("\n") // Split the data into lines
      .map(item => item.trim().replace(/\s+/g, ' ')) // Trim and normalize whitespace
      .filter(item => item); // Remove empty lines
  })
  .catch(error => console.error('Error fetching suggestions:', error)); // Handle any errors during the fetch

// Get references to the search input wrapper, input box, and suggestions box
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");

// Add an event listener to the input box for keyup events
inputBox.addEventListener("keyup", () => {
  // Get and normalize the user's input
  const userData = inputBox.value.trim().replace(/\s+/g, ' ');
  
  if (userData) {
    // Filter suggestions based on user input
    const filteredSuggestions = suggestions.filter(data =>
      data.toLowerCase().includes(userData.toLowerCase())
    );

    // Generate HTML for the filtered suggestions
    const suggestionsList = filteredSuggestions.length 
      ? filteredSuggestions.map(data => 
          `<li class="suggestion-item" data-value="${data.replace(/'/g, "\\'")}">${data}</li>`
        ).join("") 
      : "<li>No suggestions</li>"; // Display a message if no suggestions match

    // Show the suggestions box
    searchWrapper.classList.add("active");
    showSuggestions(suggestionsList); // Display the suggestions

    // Add click event listeners to each suggestion item
    document.querySelectorAll(".suggestion-item").forEach(item => {
      item.addEventListener("click", (event) => {
        selectSuggestion(event.target.dataset.value); // Handle suggestion selection
      });
    });
  } else {
    // Hide the suggestions box if there is no input
    searchWrapper.classList.remove("active");
    suggBox.innerHTML = '';
  }
});

// Function to handle selecting a suggestion
function selectSuggestion(selectData) {
  inputBox.value = selectData; // Set the input value to the selected suggestion
  searchWrapper.classList.remove("active"); // Hide the suggestions box
}

// Function to display the suggestions in the suggestions box
function showSuggestions(listData) {
  suggBox.innerHTML = listData; // Insert the suggestions HTML into the box
}
