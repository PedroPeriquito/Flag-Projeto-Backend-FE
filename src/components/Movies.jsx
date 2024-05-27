import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Movies() {
	const navigate = useNavigate();
	const [movies, setMovies] = useState([]);
	const apiKey = import.meta.env.VITE_TMDB_KEY;
	const baseUrl = import.meta.env.VITE_BASE_URL;
	const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`;

	useEffect(() => {
		fetch(url)
			.then(res => res.json())
			.then(json => setMovies(json.results));
	}, [url]);

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

	console.log(movies);

	return (
		<div>
			<h1 className='flex justify-content-center'>Movies</h1>
			<ul className='flex flex-wrap justify-content-center '>
				{movies.map(movie => (
					<li className='mx-5' key={movie.id} onClick={() => movieClick(movie)}>
						<img className='border-round-md' src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
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
