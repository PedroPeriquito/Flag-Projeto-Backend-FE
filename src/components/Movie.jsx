import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comments from './Comments';
import WriteComment from './WriteComment';

function Movie() {
	const [movie, setMovie] = useState(null);

	const params = useParams();
	const movieId = Object.values(params)[0];
	const baseUrl = import.meta.env.VITE_BASE_URL;

	useEffect(() => {
		const url = `${baseUrl}/movies/tmdb/${movieId}`;
		console.log(url);
		fetch(url)
			.then(res => res.json())
			.then(json => setMovie(json));
	}, [movieId]);

	return (
		<>
			{movie != null && (
				<div className='flex flex-wrap mt-5'>
					<div className='flex mr-3'>
						<img className='flex  ' src={`https://image.tmdb.org/t/p/w500${movie.img}`} alt={movie.title} />
					</div>
					<div className='w-full md:w-8 surface-0'>
						<div className='font-medium text-3xl text-900 mb-3'>Movie Information</div>
						<ul className='list-none p-0 m-0'>
							<li className='flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap'>
								<div className='text-500 w-6 md:w-2 font-medium'>Title</div>
								<div className='text-900 w-full md:w-8 md:flex-order-0 flex-order-1'>{movie.title}</div>
								<div className='w-6 md:w-2 flex justify-content-end'></div>
							</li>
							<li className='flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap'>
								<div className='text-500 w-6 md:w-2 font-medium'>Score</div>
								<div className='text-900 w-full md:w-8 md:flex-order-0 flex-order-1'>{movie.score?.toFixed(1)}</div>
								<div className='w-6 md:w-2 flex justify-content-end'></div>
							</li>
							<li className='flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap'>
								<div className='text-500 w-6 md:w-2 font-medium'>Release Date</div>
								<div className='text-900 w-full md:w-8 md:flex-order-0 flex-order-1'>{movie.release_date}</div>
								<div className='w-6 md:w-2 flex justify-content-end'></div>
							</li>
							<li className='flex align-items-center py-3 px-2 border-top-1 border-bottom-1 border-300 flex-wrap'>
								<div className='text-500 w-6 md:w-2 font-medium'>Plot</div>
								<div className='text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3'>{movie.plot}</div>
								<div className='w-6 md:w-2 flex justify-content-end'></div>
							</li>
						</ul>
					</div>
				</div>
			)}
			{movie == null && <div>Loading...</div>}
			<WriteComment />
			<Comments />;
		</>
	);
}

export default Movie;
