let suggestions = [];

fetch("1.txt")
  .then(response => response.text())
  .then(data => {
    suggestions = data.split("\n");
  });

const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
const linkTag = searchWrapper.querySelector("a");

inputBox.addEventListener("keyup", () => {
  const userData = inputBox.value.trim();
  if (userData) {
    const filteredSuggestions = suggestions.filter(data =>
      data.toLowerCase().startsWith(userData.toLowerCase())
    );
    
    const suggestionsList = filteredSuggestions.map(data =>
      `<li onclick="select('${data}')">${data}</li>`
    ).join("");

    searchWrapper.classList.add("active");
    showSuggestions(suggestionsList);

    icon.onclick = () => {
      inputBox.value = classList.get("active");
    };
  } else {
    searchWrapper.classList.remove("active");
  }
});

function select(selectData) {
  inputBox.value = selectData;
  searchWrapper.classList.remove("active");
}

function showSuggestions(listData) {
  suggBox.innerHTML = listData || "<li>No suggestions</li>";
}
