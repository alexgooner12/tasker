import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ loggedIn }) {
	return (
		<nav className="navbar navbar-expand-md navbar-dark bg-dark navbar-expand-lg">
			<div className="container">
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<Link to={loggedIn ? '/' : '/user/login'} className="navbar-brand">The Tasker</Link>
				<div className="collapase navbar-collapse" id="navbarTogglerDemo01">
					<ul className="navbar-nav ml-auto">
						{loggedIn ? <>
							<li className="navbar-item">
								<Link to="/" className="nav-link">Tasks</Link>
							</li>
							<li className="navbar-item">
								<Link to="/tasks/add" className="nav-link">Create</Link>
							</li>
							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle" href="/posts" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									User
        						</a>
								<div className="dropdown-menu dropdown-menu-right text-right mt-2 bg-dark" aria-labelledby="navbarDropdown">
									<Link to="/user/settings" className="navbar-link text-light pr-2">
										Settings
									</Link>
									<div className="dropdown-divider"></div>
									<Link to="/user/logout" className="navbar-link text-light pr-2">
										Logout
									</Link>
								</div>
							</li>
						</>
							: null
						}
					</ul>
				</div>
			</div>
		</nav>
	);
}