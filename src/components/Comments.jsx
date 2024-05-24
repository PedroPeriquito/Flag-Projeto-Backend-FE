import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

function Comments() {
	const [comments, setComments] = useState([]);
	const [page, setPage] = useState(0);
	const baseUrl = import.meta.env.VITE_BASE_URL;

	const params = useParams();
	const movieId = Object.values(params)[0];

	useEffect(() => {
		const url = `${baseUrl}/reviews/movie/${movieId}?page=${page}`;
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
							<li className='card' key={index}>
								<div className='surface-0 p-4 shadow-2 border-round'>
									<div className='text-3xl font-medium text-900 mb-3'>{comment.user[0].name}</div>
									<div className='font-medium text-500 mb-3'>{`${comment.score}/10`}</div>
									<div style={{ height: '150px', wordWrap: 'break-word', overflowY: 'auto' }} className='border-2 border-dashed border-300 '>
										{comment.review}
									</div>
								</div>
							</li>
						))}
					</ul>

					<Button label='Load More' onClick={loadPage} />
				</div>
			)}
			{comments == null && <div>Loading...</div>}
		</>
	);
}

export default Comments;
