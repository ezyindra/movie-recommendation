document.getElementById("getMovies").addEventListener("click", async () => {
  const genre = document.getElementById("genre").value;
  const container = document.getElementById("movies");
  container.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(`https://movie-recommendation-x7bd.vercel.app/api/movies?genre=${genre}`);
    const movies = await res.json();

    container.innerHTML = "";

    if (!movies || movies.length === 0) {
      container.innerHTML = "<p>No movies found.</p>";
      return;
    }

    movies.forEach(movie => {
      const div = document.createElement("div");
      div.classList.add("movie-card");
      div.innerHTML = `
        <img src="${movie.poster || 'https://via.placeholder.com/200x300?text=No+Image'}" alt="${movie.title}">
        <div class="movie-info">
          <h3>${movie.title}</h3>
          <p><b>⭐ Rating:</b> ${movie.rating}</p>
          <p><b>📅 Release:</b> ${movie.release_date}</p>
          <p>${movie.overview}</p>
        </div>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p style='color:red'>Error fetching movies</p>";
  }
});
