import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Comments() {
	const [comments, setComments] = useState([]);
	const [page, setPage] = useState(0);

	const params = useParams();
	const movieId = Object.values(params)[0];

	useEffect(() => {
		const url = `http://localhost:3000/reviews/movie/${movieId}?page=${page}`;
		fetch(url)
			.then(res => res.json())
			.then(json => setComments(prev => [...prev, ...json]));
	}, [page, movieId]);
	console.log(comments);

	function loadPage() {
		setPage(page + 1);
	}
	return (
		<>
			{comments != null && (
				<div>
					<h2>Comments</h2>

					<ul>
						{comments.map((comment, index) => (
							<li key={index}>
								<p>{comment.user[0].name}</p>
								<p>Rating: {comment.score?.toFixed(1)}</p>
								<p>{comment.review}</p>
							</li>
						))}
					</ul>
					<button onClick={loadPage}>Load More</button>
				</div>
			)}
			{comments == null && <div>Loading...</div>}
		</>
	);
}

export default Comments;
