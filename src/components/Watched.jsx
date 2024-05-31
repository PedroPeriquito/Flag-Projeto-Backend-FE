import { useState, useEffect } from 'react';

function Watched() {
	const [movies, setMovies] = useState([]);

	const userId = localStorage.getItem('userId');
	const baseUrl = import.meta.env.VITE_BASE_URL;

	useEffect(() => {
		const url = `${baseUrl}/reviews/watched/${userId}`;

		fetch(url)
			.then(res => res.json())
			.then(json => setMovies(json));
	}, []);

	return (
		<>
			{movies != null && (
				<div>
					<h1 className='flex justify-content-center'>Your watched movies</h1>
					<div className='flex flex-wrap justify-content-center'>
						{movies.map(movie => (
							<div className='mr-5' key={movie._id}>
								<img className='border-round-md' src={`https://image.tmdb.org/t/p/w500${movie.movie[0].img}`} alt={movie.movie[0].title} />

								<p>
									{movie.movie[0].title} - {movie.score}
								</p>
							</div>
						))}
					</div>
				</div>
			)}

			{movies == null && <div>Loading...</div>}
		</>
	);
}

export default Watched;
