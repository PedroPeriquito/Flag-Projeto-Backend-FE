import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const baseUrl = import.meta.env.VITE_BASE_URL;
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

		const url = `${baseUrl}/login`;
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
			<div className='flex align-items-center justify-content-center'>
				<div className='surface-card p-4 shadow-2 border-round w-full lg:w-6'>
					<div className='text-center mb-5'>
						<div className='text-900 text-3xl font-medium mb-3'>Login</div>
						<span className='text-600 font-medium line-height-3'>Do not have an account?</span>
						<Link to='/register'>
							<a className='font-medium no-underline ml-2 text-blue-500 cursor-pointer'>Create today!</a>
						</Link>
					</div>

					<div>
						<form onSubmit={handleSubmit} className='w-full'>
							<label htmlFor='email' className='block text-900 font-medium mb-2'>
								Email
							</label>
							<InputText id='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' className='w-full mb-3' />

							<label htmlFor='password' className='block text-900 font-medium mb-2'>
								Password
							</label>

							<InputText id='password' type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} className='w-full mb-3' />

							<Button label='Sign In' icon='pi pi-user' className='w-full' />
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
