import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comments from './Comments';

function Movie() {
	const [movie, setMovie] = useState(null);

	const params = useParams();
	const movieId = Object.values(params)[0];

	useEffect(() => {
		const url = `http://localhost:3000/movies/${movieId}`;

		fetch(url)
			.then(res => res.json())
			.then(json => setMovie(json));
	}, [movieId]);

	return (
		<>
			{movie != null && (
				<div>
					<img src={`https://image.tmdb.org/t/p/w500${movie.img}`} alt={movie.title} />
					<h1>{movie.title}</h1>
					<p>Rating: {movie.score?.toFixed(1)}</p>
					<p>Release Date: {movie.release_date}</p>
					<p>Plot: {movie.plot}</p>
				</div>
			)}
			{movie == null && <div>Loading...</div>}
			<Comments />;
		</>
	);
}

export default Movie;
