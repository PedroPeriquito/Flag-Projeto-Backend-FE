import { useState } from 'react';

function ChangePassword() {
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [verifyPassword, setVerifyPassword] = useState('');
	const token = localStorage.getItem("token");

	async function handleSubmit(event) {
		event.preventDefault();

		const body = {
			password,
			newPassword,
			verifyPassword,
		};

		const options = {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${token}`,
			},
		};

		console.log(options);

		const url = 'http://localhost:3000/changePassword/' + localStorage.getItem('userId');
		const response = await fetch(url, options);
		const result = await response.json();

		console.log(url);
		console.log(result);
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>Password:</label>
				<br />
				<input name='password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
				<br />
				<label>New Password:</label>
				<br />
				<input name='newPassword' type='password' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
				<br />
				<label>Verify Password:</label>
				<br />
				<input name='verifyPassword' type='password' value={verifyPassword} onChange={e => setVerifyPassword(e.target.value)} />
				<br />
				<button>OK</button>
			</form>
		</>
	);
}

export default ChangePassword;
