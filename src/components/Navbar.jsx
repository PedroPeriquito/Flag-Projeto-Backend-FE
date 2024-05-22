import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

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

	return (
		<div>
			<Link to='/'>
				<button>Home</button>
			</Link>
			<form onSubmit={handleSubmit}>
				<input type='text' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder='Seach Movies' />
				<button type='submit'>Search</button>
			</form>
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
						<Link to='/watched'>
							<button>Watched Movies</button>
						</Link>
						<Link to='/plantowatch'>
							<button>Watchlist</button>
						</Link>
						<Link to='/changepassword'>
							<button>Change Password</button>
						</Link>
						<button onClick={Logout}>Logout</button>
					</>
				)}
			</li>
		</div>
	);
};
export default Nav;
