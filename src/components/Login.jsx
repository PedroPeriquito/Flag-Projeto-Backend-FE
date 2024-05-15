import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function handleSubmit(event) {
		event.preventDefault();

		const body = {
			email,
			password,
		};

		const options = {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		};

		const url = 'http://localhost:3000/login';
		const response = await fetch(url, options);

		if (response.ok) {
			const result = await response.json();
			localStorage.setItem('userId', result.userId);
			localStorage.setItem('token', result.token);
			navigate('/');
		}
	}

	return (
		<>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<label>Email:</label>
				<br />
				<input name='email' value={email} onChange={e => setEmail(e.target.value)} />
				<br />
				<label>Password:</label>
				<br />
				<input name='password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
				<br />
				<button>Login</button>
			</form>
		</>
	);
}

export default Login;
