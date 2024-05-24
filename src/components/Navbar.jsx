import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';

const Nav = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		setIsLoggedIn(token);
	}, []);

	function handleSubmit(event) {
		event.preventDefault();
		navigate(`/search?query=${searchTerm}`);
	}
	function Logout(event) {
		event.preventDefault();
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		setIsLoggedIn(false);
		navigate('/login');
	}

	const startContent = (
		<Link to='/'>
			<h1>The Movie Archive</h1>
		</Link>
	);

	const centerContent = (
		<form onSubmit={handleSubmit}>
			<IconField iconPosition='left'>
				<InputIcon className='pi pi-search'> </InputIcon>
				<InputText v-model='value1' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder='Search Movies' />
			</IconField>
		</form>
	);

	const op = useRef(null);

	const endContent = (
		<li>
			{!isLoggedIn && (
				<>
					<Link to='/login'>
						<button>Login</button>
					</Link>
					<Link to='/register'>
						<button>Register</button>
					</Link>
				</>
			)}
			{isLoggedIn && (
				<>
					<Avatar icon='pi pi-user' size='xlarge' shape='circle' onClick={e => op.current.toggle(e)} />
					<OverlayPanel ref={op}>
						<div className='flex flex-column'>
							<Link to='/watched'>
								<Button label='Watched Movies' className='w-full mb-2' />
							</Link>
							<Link to='/plantowatch'>
								<Button label='Watchlist' className='w-full mb-2' />
							</Link>
							<Link to='/changepassword'>
								<Button label='Change Password' className='w-full mb-2' />
							</Link>
							<Button label='Logout' onClick={Logout} className='w-full' />
						</div>
					</OverlayPanel>
				</>
			)}
		</li>
	);

	return (
		<div>
			<Toolbar start={startContent} center={centerContent} end={endContent} />
		</div>
	);
};
export default Nav;
