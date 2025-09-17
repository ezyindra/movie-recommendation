document.getElementById("getMovies").addEventListener("click", async () => {
  const genre = document.getElementById("genre").value;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch("https://movie-recommendation-x7bd.vercel.app/api/movies?genre=" + genre);

    if (!res.ok) throw new Error("Failed to fetch movies");

    const movies = await res.json();

    if (movies.length === 0) {
      resultsDiv.innerHTML = "<p>No movies found for this genre.</p>";
      return;
    }

    // Display results
    resultsDiv.innerHTML = movies
      .map(
        (m) => `
        <div class="movie-card">
          <h2>${m.title} (${new Date(m.release_date).getFullYear()})</h2>
          <p><strong>Rating:</strong> ⭐ ${m.rating}</p>
          <p>${m.overview}</p>
        </div>
      `
      )
      .join("");
  } catch (err) {
    resultsDiv.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
  }
});
