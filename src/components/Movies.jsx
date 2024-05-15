import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Movies() {
	const navigate = useNavigate();
	const [movies, setMovies] = useState([]);
	const apiKey = import.meta.env.VITE_TMDB_KEY;
	const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`;

	useEffect(() => {
		fetch(url)
			.then(res => res.json())
			.then(json => setMovies(json.results))
			.then(() => {
				navigate(`/movie/${movie.id}`);
			});
	}, []);

	function handleMovieClick(movie) {
		const apiUrl = 'http://localhost:3000/movies';
		/* 		const token = localStorage.getItem('token'); */
		const body = {
			idTMDB: movie.id,
			title: movie.title,
			img: movie.backdrop_path,
			release_date: movie.release_date,
			overview: movie.overview,
			vote_average: movie.vote_average,
		};
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				/* Authorization: `Bearer ${token}`, */
			},
			body: JSON.stringify(body),
		};
		fetch(apiUrl, options).then(response => response.json());
	}

	console.log(movies);

	return (
		<div>
			<h1>Movies</h1>
			<ul style={{ display: 'flex', flexWrap: 'wrap', padding: 0 }}>
				{movies.map(movie => (
					<li key={movie.id} onClick={() => handleMovieClick(movie)}>
						<img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
						<p>
							{movie.title} - {movie.vote_average.toFixed(1)}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Movies;
