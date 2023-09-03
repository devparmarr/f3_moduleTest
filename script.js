document.addEventListener('DOMContentLoaded', getCurrentImageOfTheDay);

// NASA API key (replace with your own)
const apiKey = 'c6uoDYKZhCRAt9Yf69Orkxwu5zemCcSEhnMZM09q';

// Function to fetch and display the current image of the day
function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    getImageOfTheDay(currentDate);
}

// Function to fetch and display the image for the selected date
function getImageOfTheDay(date) {
    const apiUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const imageContainer = document.getElementById('current-image-container');
            imageContainer.innerHTML = `
                <img src="${data.url}" alt="${data.title}">
                <h2>${data.title}</h2>
                <p>${data.explanation}</p>
            `;

            saveSearch(date);
            addSearchToHistory();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch image data. Please try again later.');
        });
}

// Function to save the selected date to local storage
function saveSearch(date) {
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches));
}

// Function to add search history to the UI
function addSearchToHistory() {
    const searchHistory = document.getElementById('search-history');
    searchHistory.innerHTML = '';
    
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    
    searches.forEach(search => {
        const listItem = document.createElement('li');
        listItem.textContent = search;
        listItem.addEventListener('click', () => getImageOfTheDay(search));
        searchHistory.appendChild(listItem);
    });
}
