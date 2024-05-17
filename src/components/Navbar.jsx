import { Link } from 'react-router-dom';

const nav = () => {
	function Logout() {
		event.preventDefault;
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
	}
	return (
		<li>
			<Link to='/login'>
				<button>Login</button>
			</Link>
			<Link to='/register'>
				<button>Register</button>
			</Link>
			<Link to='/changepassword'>
				<button>Change Password</button>
			</Link>
			<button onClick={Logout()}>Logout</button>
		</li>
	);
};

export default nav;
