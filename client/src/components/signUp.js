import React from 'react';
import { Link } from 'react-router-dom';
import Loader from './loader';

export default class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			isLoading: false,
			errorUsername: false,
			errorEmail: false,
			errorPassword: false,
		}
	}

	onChangeInput = (e, prop) => {
		this.setState({ [prop]: e.target.value });
		this.resetErrors();
	}

	onSubmit = async e => {
		e.preventDefault();
		const jsonRes = await fetch('/user/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.createUser())
		});
		const res = await jsonRes.json();
		this.handleSignupResponse(res);
	}

	createUser = () => {
		return Object.assign({}, {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password
		});
	}

	handleSignupResponse = res => {
		const { error } = res;
		!error ? this.handleSuccessfulSignup() : this.handleSignupError(error);
	}

	handleSuccessfulSignup = () => {
		this.setState({ isLoading: true });
		setTimeout(() => {
			this.setState({ isLoading: false });
			window.location = '/user/login';
		}, 2000);
	}

	handleSignupError = error => {
		if (error.includes('name')) this.setState({ errorUsername: error });
		else if (error.includes('email')) this.setState({ errorEmail: error });
		else if (error.includes('password')) this.setState({ errorPassword: error });
	}

	resetErrors = () => {
		this.setState({ errorPassword: '', errorUsername: '', errorEmail: '' });
	}

	render() {
		return (
			<div>
				<div className="mb-5">
					<h1 className="display-4 mb-3">Welcome to the Tasker <br /> App which remembers your appointments..</h1>
					<h5 className="text-muted">Even when you don't..</h5>
				</div>
				{this.state.isLoading ? <Loader /> : null}

				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Username: </label>
						{this.state.errorUsername ? <div className="alert alert-danger" role="alert">
							{this.state.errorUsername}</div> : null}
						<input 
							type="text"
							required
							autoComplete="username"
							className="form-control"
							value={this.state.name}
							onChange={e => this.onChangeInput(e, 'name')}
						/>
						<label>Email: </label>
						{this.state.errorEmail ? <div className="alert alert-danger" role="alert">
							{this.state.errorEmail}</div> : null}
						<input 
							type="email"
							required
							autoComplete="email"
							className="form-control"
							value={this.state.email}
							onChange={e => this.onChangeInput(e, 'email')}
						/>
						<label>Password: </label>
						{this.state.errorPassword ? <div className="alert alert-danger" role="alert">
							{this.state.errorPassword}</div> : null}
						<input 
							type="password"
							required
							autoComplete="new-password"
							className="form-control"
							value={this.state.password}
							onChange={e => this.onChangeInput(e, 'password')}
						/>
					</div>
					<div className="form-group">
						<input 
							type="submit" 
							value="Confirm" 
							className="btn btn-primary" 
						/>
					</div>
				</form>
				<p>Already have an account ?</p>
				<Link to="/user/login">Login</Link>
			</div>
		)
	}
}