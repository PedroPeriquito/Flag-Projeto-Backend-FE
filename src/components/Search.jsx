function Movies() {
	const navigate = useNavigate();
	const [movies, setMovies] = useState([]);
	const apiKey = import.meta.env.VITE_TMDB_KEY;
	const search = 'kong';
	const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;

	useEffect(() => {
		fetch(url)
			.then(res => res.json())
			.then(json => setMovies(json.results));
	}, []);

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
