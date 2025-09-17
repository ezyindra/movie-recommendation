export default async function handler(req, res) {
  const genre = req.query.genre;
  const API_KEY = process.env.TMDB_API_KEY; // must be set in Vercel

  if (!genre) return res.status(400).json({ error: 'Genre is required' });

  try {
    // Get genre list from TMDb
    const genreRes = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    const genresData = await genreRes.json();

    const genreObj = genresData.genres.find(g => g.name.toLowerCase() === genre.toLowerCase());
    if (!genreObj) return res.status(404).json({ error: 'Genre not found' });

    // Get top-rated movies in this genre
    const moviesRes = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreObj.id}&sort_by=vote_average.desc&vote_count.gte=10`
    );
    const moviesData = await moviesRes.json();

    // Return only top 10 movies
    const movies = moviesData.results.slice(0, 10).map(m => ({
      title: m.title,
      overview: m.overview,
      rating: m.vote_average,
      release_date: m.release_date
    }));

    res.status(200).json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
