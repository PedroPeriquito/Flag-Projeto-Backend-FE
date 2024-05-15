import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/LogIn';
import ChangePassword from './components/Changepassword';
import Movies from './components/Movies';
import Movie from './components/Movie';
/* import Comments from './components/Comments'; */

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Movies />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route path='/changepassword' element={<ChangePassword />} />
				<Route path='/movie/:id' element={<Movie />} />
			</Routes>
		</BrowserRouter>
	);
}
export default App;
