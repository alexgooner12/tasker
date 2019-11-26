import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar';
import TaskList from './components/taskList';
import EditTask from './components/editTask';
import CreateTask from './components/createTask';
import SignUp from './components/signUp';
import Login from './components/login';
import IdentifyUser from './components/identifyUser';
import ResetAccount from './components/resetAccount';
import Logout from './components/logout';
import UserSettings from './components/userSettings';
import UpdatePassword from './components/updatePassword';
import Unauthorized from './components/unauthorized';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap.js';
import './App.css';

function App() {
	const loggedIn = localStorage.getItem('user');
	return (
		<Router>
			<Navbar loggedIn={loggedIn} />
			<br />
			<div className="container">
				<Switch>
					<Route path="/" exact component={loggedIn ? TaskList : Login} />
					<Route path="/tasks/add" exact component={loggedIn ? CreateTask : Unauthorized} />
					<Route path="/tasks/edit/:id" exact component={loggedIn ? EditTask : Unauthorized} />
					<Route path="/user/settings" exact component={loggedIn ? UserSettings : Unauthorized} />
					<Route path="/user/settings/password" exact component={loggedIn ? UpdatePassword : Unauthorized} />
					<Route path="/user/logout" exact component={loggedIn ? Logout : Unauthorized} />
					<Route path="/user/signup" exact component={SignUp} />
					<Route path="/user/login" exact component={Login} />
					<Route path="/user/login/identify" exact component={IdentifyUser} />
					<Route path="/user/login/reset" exact component={ResetAccount} />
					<Route path="" component={() => <h1>Error 404 <br /> Content not found</h1>} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
