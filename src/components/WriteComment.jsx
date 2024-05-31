import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const WriteComment = () => {
	const [comment, setComment] = useState(null);
	const [review, setReview] = useState('');
	const [score, setScore] = useState('');
	const [id, setId] = useState('');
	const [bookmark, setBookmark] = useState('');
	const [visible, setVisible] = useState(false);

	const token = localStorage.getItem('token');
	const idUser = localStorage.getItem('userId');
	const baseUrl = import.meta.env.VITE_BASE_URL;

	const params = useParams();
	const movieId = Object.values(params)[0];

	useEffect(() => {
		const url = `${baseUrl}/reviews/review/${movieId}/${idUser}`;

		fetch(url)
			.then(res => res.json())
			.then(json => {
				setComment(json);
				if (json) {
					setId(json._id);
					setReview(json.review);
					setScore(json.score);
					if (json.watched) {
						setBookmark('watched');
					} else if (json.planToWatch) {
						setBookmark('planToWatch');
					}
				}
			});
	}, [movieId, idUser]);

	async function handleSubmit(event) {
		event.preventDefault();

		const body = {
			idTMDB: movieId,
			idUser,
			review,
			score,
			watched: bookmark === 'watched',
			planToWatch: bookmark === 'planToWatch',
		};
		const method = id ? 'PUT' : 'POST';

		const options = {
			method,
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${token}`,
			},
		};

		console.log(options);

		const url = id ? `${baseUrl}/reviews/${id}` : `${baseUrl}/reviews`;

		const response = await fetch(url, options);
		await response.json();
	}

	const scoreOptions = [];
	for (let i = 1; i <= 10; i++) {
		scoreOptions.push({ label: i.toString(), value: i });
	}
	async function handleDelete() {
		const options = {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${token}`,
			},
		};

		console.log(options);

		const url = `http://localhost:3000/reviews/${id}`;
		const response = await fetch(url, options);
		await response.json();
		setVisible(false);
	}
	const bookmarkOptions = [
		{ label: 'Watched', value: 'watched' },
		{ label: 'Plan to Watch', value: 'planToWatch' },
	];
	const toast = useRef(null);
	const showSuccess = () => {
		toast.current.show({ severity: 'success', summary: 'Success', detail: 'Comment Posted', life: 3000 });
	};

	return (
		<>
			<h2>Write a comment</h2>
			<form onSubmit={handleSubmit} className='p-fluid'>
				<div className='flex flex-column md:flex-row gap-4'>
					<Dropdown value={score} onChange={e => setScore(e.value)} options={scoreOptions} placeholder='Score' className='w-full md:w-14rem' />
					<Dropdown value={bookmark} onChange={e => setBookmark(e.value)} options={bookmarkOptions} placeholder='Bookmark' className='w-full md:w-14rem' />
				</div>
				<InputTextarea value={review} onChange={e => setReview(e.target.value)} rows={5} cols={30} className='w-full mt-4' />
				<div className='flex flex-column md:flex-row gap-4 mt-4'>
					<Toast ref={toast} />
					<Button type='submit' onClick={showSuccess} label='Post Comment' className='w-full md:w-auto' />
					<Button label='Delete' className='w-full md:w-auto bg-primary-reverse' onClick={() => setVisible(true)} />
				</div>
				<ConfirmDialog
					visible={visible}
					onHide={() => setVisible(false)}
					message='Are you sure you want to delete?'
					header='Confirmation'
					icon='pi pi-exclamation-triangle'
					accept={handleDelete}
					reject={() => setVisible(false)}
				/>
			</form>
		</>
	);
};

export default WriteComment;
