import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [country, setCountry] = useState('');

	async function handleSubmit(event) {
		event.preventDefault();

		const body = {
			email,
			password,
			name,
			country,
		};

		const options = {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		};

		console.log(options);

		const url = 'http://localhost:3000/register';
		const response = await fetch(url, options);

		if (response.ok) {
			await response.json();
			navigate('/login');
		}
	}

	return (
		<>
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				<label>Email:</label>
				<br />
				<input name='email' value={email} onChange={e => setEmail(e.target.value)} />
				<br />
				<label>Password:</label>
				<br />
				<input name='password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
				<br />
				<label>Name:</label>
				<br />
				<input name='name' value={name} onChange={e => setName(e.target.value)} />
				<br />
				<label>Country:</label>
				<br />
				<input name='country' value={country} onChange={e => setCountry(e.target.value)} />
				<br />
				<button>OK</button>
			</form>
		</>
	);
}

export default Register;
