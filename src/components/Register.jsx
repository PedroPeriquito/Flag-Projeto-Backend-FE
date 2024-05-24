import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

import { Button } from 'primereact/button';

function Register() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [country, setCountry] = useState('');
	const baseUrl = import.meta.env.VITE_BASE_URL;

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

		const url = `${baseUrl}/register`;
		const response = await fetch(url, options);

		if (response.ok) {
			await response.json();
			navigate('/login');
		}
	}
	const countries = [{ name: 'Spain' }, { name: 'Portugal' }];
	console.log(country);
	return (
		<>
			<div className='flex align-items-center justify-content-center mt-5'>
				<div className='surface-card p-4 shadow-2 border-round w-full lg:w-6'>
					<div className='text-center mb-5'>
						<div className='text-900 text-3xl font-medium mb-3'>Register</div>
						<span className='text-600 font-medium line-height-3'>Already have an account?</span>
						<Link to='/login'>
							<a className='font-medium no-underline ml-2 text-blue-500 cursor-pointer'>Sign In!</a>
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
							<label htmlFor='name' className='block text-900 font-medium mb-2'>
								Name
							</label>
							<InputText id='name' placeholder='Name' value={name} onChange={e => setName(e.target.value)} className='w-full mb-3' />
							<label htmlFor='country' className='block text-900 font-medium mb-2'>
								Name
							</label>
							<Dropdown value={country} onChange={e => setCountry(e.value)} options={countries} optionLabel='name' placeholder='Select a Country' className='w-full mb-3' optionValue='name' />

							<Button label='Register' icon='pi pi-user' className='w-full' />
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default Register;
