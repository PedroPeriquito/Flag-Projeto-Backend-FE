import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';


function search() {
	const location = useLocation();
	const navigate = useNavigate();
	const [movies, setMovies] = useState([]);
	const apiKey = import.meta.env.VITE_TMDB_KEY;
	const baseUrl = import.meta.env.VITE_BASE_URL;

	const search = location.search;

	const url = `https://api.themoviedb.org/3/search/movie${search}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;

	useEffect(() => {
		fetch(url)
			.then(res => res.json())
			.then(json => setMovies(json.results));
	}, []);

	function movieClick(movie) {
		const apiUrl = `${baseUrl}/movies`;
		/* 		const token = localStorage.getItem('token'); */
		const body = {
			idTMDB: movie.id.toString(),
			title: movie.title,
			img: movie.backdrop_path,
			release_date: movie.release_date,
			plot: movie.overview,
			score: movie.vote_average,
		};

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				/* Authorization: `Bearer ${token}`, */
			},
			body: JSON.stringify(body),
		};
		fetch(apiUrl, options)
			.then(() => {
				navigate(`/movie/${movie.id}`);
			})
			.then(response => response.json());
	}

	return (
		<div>
		
			<h1>Movies</h1>
			<ul style={{ display: 'flex', flexWrap: 'wrap', padding: 0 }}>
				{movies.map(movie => (
					<li key={movie.id} onClick={() => movieClick(movie)}>
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

export default search;
