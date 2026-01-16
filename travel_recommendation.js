// Get references to DOM elements
const searchInput = document.getElementById("searchInput");
const btnSearch = document.getElementById("btnSearch");
const btnReset = document.getElementById("btnReset");
const resultsContainer = document.getElementById("results");

let travelData = [];

// Load JSON data once when the page loads
window.addEventListener("DOMContentLoaded", () => {
    fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            travelData = data.places; // store JSON places array
            console.log("Loaded travel data:", travelData); // for debugging
        })
        .catch(err => console.error("Error loading JSON:", err));
});

// Function to display recommendations
function displayResults(results) {
    resultsContainer.innerHTML = ""; // clear previous

    if (results.length === 0) {
        resultsContainer.innerHTML = "<p>No places found.</p>";
        return;
    }

    results.forEach(place => {
        const card = document.createElement("div");
        card.classList.add("recommendation-card");

        card.innerHTML = `
        <img src="${place.imageUrl}" alt="${place.name}">
        <h3>${place.name}</h3>
        <p>${place.description}</p>
      `;

        resultsContainer.appendChild(card);
    });
}

// Do search when user clicks Search
btnSearch.addEventListener("click", () => {
    const keyword = searchInput.value.trim().toLowerCase();

    if (!keyword) {
        alert("Please enter a search keyword.");
        return;
    }

    const filtered = travelData.filter(place => {
        return place.name.toLowerCase().includes(keyword) ||
            place.description.toLowerCase().includes(keyword) ||
            place.type.toLowerCase().includes(keyword);
    });

    displayResults(filtered);
});

// Clear search results and reset input
btnReset.addEventListener("click", () => {
    searchInput.value = "";
    resultsContainer.innerHTML = "";
});