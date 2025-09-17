document.getElementById('getMovies').addEventListener('click', async () => {
    const genre = document.getElementById('genreSelect').value;
    if (!genre) return alert('Please select a genre.');

    const res = await fetch(`/api/movies?genre=${genre}`);
    const movies = await res.json();

    const moviesList = document.getElementById('moviesList');
    moviesList.innerHTML = '';

    movies.forEach(movie => {
        const div = document.createElement('div');
        div.className = 'movie';
        div.innerHTML = `<h2>${movie.title} (${movie.rating}/10)</h2>
                         <p>${movie.overview}</p>
                         <p><strong>Release Date:</strong> ${movie.release_date}</p>`;
        moviesList.appendChild(div);
    });
});
