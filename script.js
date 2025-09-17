document.getElementById("getMovies").addEventListener("click", async () => {
  const genre = document.getElementById("genre").value;
  const container = document.getElementById("movies");
  container.innerHTML = "<p>Loading...</p>";

  try {
    // 👇 If testing locally, use full Vercel URL instead of relative /api/movies
    const res = await fetch("https://movie-recommendation-x7bd.vercel.app/api/movies?genre=" + genre);
    const movies = await res.json();

    container.innerHTML = ""; // clear old results

    if (movies.error) {
      container.innerHTML = `<p style="color:red">${movies.error}</p>`;
      return;
    }

    movies.forEach(movie => {
      const div = document.createElement("div");
      div.classList.add("movie");
      div.innerHTML = `
        <h3>${movie.title}</h3>
        <p><b>Rating:</b> ${movie.rating}</p>
        <p><b>Release:</b> ${movie.release_date}</p>
        <p>${movie.overview}</p>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p style='color:red'>Failed to fetch movies</p>";
  }
});
