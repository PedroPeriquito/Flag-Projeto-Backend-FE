import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

function ChangePassword() {
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [verifyPassword, setVerifyPassword] = useState('');
	const token = localStorage.getItem('token');
	const baseUrl = import.meta.env.VITE_BASE_URL;

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

		const url = `${baseUrl}/changePassword/` + localStorage.getItem('userId');
		const response = await fetch(url, options);
		const result = await response.json();

		console.log(url);
		console.log(result);
	}

	return (
		<>
			<div className='flex align-items-center justify-content-center mt-5'>
				<div className='surface-card p-4 shadow-2 border-round w-full lg:w-6'>
					<div className='text-center mb-5'>
						<div className='text-900 text-3xl font-medium mb-3'>Change Password</div>
					</div>

					<div>
						<form onSubmit={handleSubmit} className='w-full'>
							<label htmlFor='email' className='block text-900 font-medium mb-2'>
								Password
							</label>
							<InputText id='password' type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' className='w-full mb-3' />
							<label htmlFor='password' className='block text-900 font-medium mb-2'>
								New Password
							</label>
							<InputText id='newPassword' type='password' placeholder='New Password' value={newPassword} onChange={e => setNewPassword(e.target.value)} className='w-full mb-3' />
							<label htmlFor='name' className='block text-900 font-medium mb-2'>
								Verify Password
							</label>
							<InputText id='verifyPassword' type='password' placeholder='Verify Password' value={verifyPassword} onChange={e => setVerifyPassword(e.target.value)} className='w-full mb-3' />

							<Button label='Change Password' icon='pi pi-key' className='w-full' />
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default ChangePassword;
