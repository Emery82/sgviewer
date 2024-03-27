async function fetchData() {
    const response = await fetch('data.json');
    return await response.json();
}

async function displayPosters() {
    const jsonData = await fetchData();
    const container = document.getElementById('container');
    container.innerHTML = ''; // Clear previous posters

    jsonData.forEach(movie => {
        const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster}`;
        const poster = createPosterElement('img', posterUrl, movie.title, 'poster');
        const title = createPosterElement('div', movie.title, 'title');
        const posterContainer = createPosterElement('div', null, 'poster-container');

        const link = document.createElement('a');
        link.href = `https://www.trakt.tv/movies/${movie.imdb_id}`;
        link.target = "_blank";
        link.appendChild(poster);
        posterContainer.appendChild(link);
        posterContainer.appendChild(title);
        container.appendChild(posterContainer);
    });
}

function createPosterElement(tagName, src, alt, className) {
    const element = document.createElement(tagName);
    element.src = src;
    element.alt = alt;
    if (className) {
        element.classList.add(className);
    }
    return element;
}

// Display posters when the page loads
displayPosters().catch(error => {
    console.error('Error displaying posters:', error);
});
