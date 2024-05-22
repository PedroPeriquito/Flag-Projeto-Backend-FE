import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/LogIn';
import ChangePassword from './components/Changepassword';
import Movies from './components/Movies';
import Movie from './components/Movie';
import Search from './components/Search';
import Watched from './components/Watched';
import PlanToWatch from './components/PlanToWatch';
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Movies />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route path='/changepassword' element={<ChangePassword />} />
				<Route path='/movie/:idTMDB' element={<Movie />} />
				<Route path='/search' element={<Search />} />
				<Route path='/watched' element={<Watched />} />
				<Route path='/plantowatch' element={<PlanToWatch />} />
			</Routes>
		</BrowserRouter>
	);
}
export default App;
