// serverless function to hide API key
import fetch from 'node-fetch';

export default async function handler(req, res) {
    const genre = req.query.genre;
    const API_KEY = process.env.TMDB_API_KEY; // hidden in Vercel env

    if (!genre) return res.status(400).json({ error: 'Genre is required' });

    try {
        const genreResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
        const genresData = await genreResponse.json();
        const genreObj = genresData.genres.find(g => g.name.toLowerCase() === genre.toLowerCase());
        if (!genreObj) return res.status(404).json({ error: 'Genre not found' });

        const moviesResponse = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreObj.id}&sort_by=vote_average.desc&vote_count.gte=50`);
        const moviesData = await moviesResponse.json();

        const movies = moviesData.results.slice(0, 10).map(m => ({
            title: m.title,
            overview: m.overview,
            rating: m.vote_average,
            release_date: m.release_date
        }));

        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
