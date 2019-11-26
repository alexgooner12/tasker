import React from 'react';
import Loader from './loader';
import Bouncer from './bouncer';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			password: '',
			isLoading: false,
			hasMounted: false
		}
	}

	componentDidMount() {
		setTimeout(() => this.setState({ hasMounted: true }), 2000);
	}

	onChangeInput = (e, prop) => {
		this.setState({ [prop]: e.target.value });
		this.resetErrors();
	}

	onLogin = async e => {
		e.preventDefault();
		const jsonResponse = await fetch('/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.getUser())
		});
		const response = await jsonResponse.json();
		this.handleLoginResponse(response);
	}

	getUser = () => {
		return Object.assign({}, {
			name: this.state.name,
			password: this.state.password
		});
	}

	handleLoginResponse = response => {
		const { token, error } = response;
		token ? this.handleSuccessfulLogin(token) : this.handleErrorLogin(error);
	}

	handleSuccessfulLogin = token => {
		this.setState({ isLoading: true });
		localStorage.setItem('user', token);
		setTimeout(() => window.location = '/', 2000);
	}

	handleErrorLogin = error => {
		if (error.includes('Username')) this.setState({ errorUsername: error });
		else if (error.includes('password')) this.setState({ errorPassword: error });
	}

	resetErrors = () => {
		this.setState({ errorPassword: '', errorUsername: '' });
	}

	render() {
		return (
			<div>
				{!this.state.hasMounted ? <div style={{ 'height': '100vh' }}><Bouncer /></div> :
					<>
						<div className="mb-4">
							<h1 className="display-4">Welcome</h1>
						</div>
						{this.state.isLoading ? <Loader /> : null}
						<form onSubmit={this.onLogin} className="mb-5">
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
						<div className="d-flex justify-content-between">
							<div>
								<p>Don't have an account ?</p>
								<button
									className="btn btn-info"
									onClick={() => window.location = "/user/signup"}>Sign Up !
								</button>
							</div>
							<div className="text-right">
								<p>Forgot your account ?</p>
								<button
									className='btn btn-secondary'
									onClick={() => window.open('/user/login/identify')}>Click here
								</button>
							</div>
						</div>
					</>
				}
			</div>
		)
	}
}