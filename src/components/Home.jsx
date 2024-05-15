import { Link } from 'react-router-dom';

const nav = () => {
	return (
		<li>
			<Link to='/login'>
				<button>Login</button>
			</Link>
			<Link to='/register'>
				<button>Register</button>
			</Link>
		</li>
	);
};

export default nav;
