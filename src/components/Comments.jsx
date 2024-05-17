import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Comment() {
	const [comments, setComments] = useState(null);

	const params = useParams();
	const movieId = Object.values(params)[0];

	useEffect(() => {
		const url = `http://localhost:3000/reviews/movie/${movieId}`;
		fetch(url)
			.then(res => res.json())
			.then(json => setComments(json)); // Assuming setComment is your intended function
	}, [movieId]);
	console.log(movieId);
	return (
		<>
			{comments != null && (
				<ul>
					{comments.map((comment, index) => (
						<li key={index}>
							<p>Rating: {comment.score?.toFixed(1)}</p>
							<p>{comment.review}</p>
						</li>
					))}
				</ul>
			)}
			{comments == null && <div>Loading...</div>}
		</>
	);
}

export default Comment;
