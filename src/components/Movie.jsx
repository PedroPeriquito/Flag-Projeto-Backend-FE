import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetails() {
	const [movie, setMovie] = useState(null);

	const params = useParams();
	let movieId = Object.values(params)[0];

	const url = `https://localhost:3000/movies/${movieId}`;

	useEffect(() => {
		fetch(url)
			.then(res => res.json())
			.then(json => setMovie(json));
	}, [movieId, url]);

	return (
		<div>
			<h1>{movie.title}</h1>
			<p>Rating: {movie.vote_average.toFixed(1)}</p>
			<p>Release Date: {movie.release_date}</p>
			<p>Plot: {movie.overview}</p>
		</div>
	);
}

export default MovieDetails;
