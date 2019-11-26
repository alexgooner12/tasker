import React from 'react';

export default class UserSettings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			errorName: null,
			password: '',
			_id: ''
		}
	}

	async componentDidMount() {
		const jsonUser = await fetch('/user', {
			headers: {
				'token': localStorage.getItem('user')
			}
		});
		const user = await jsonUser.json();
		this.setState({ ...user });
	}

	onChangeInput = (e, prop) => {
		this.setState({
			[prop]: e.target.value
		})
	}

	handleUpdate = async e => {
		e.preventDefault();
		const jsonResponse = await fetch(`/user/update`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.createUpdatedUser())
		});
		const response = await jsonResponse.json();
		this.handleUpdatingResponse(response);
	}

	handleUpdatingResponse = res => {
		const { error } = res;
		!error ? window.location = '/' : this.handleUpdatingError(error);
	}

	handleUpdatingError = error => {
		error.includes('Username') ? this.setState({ errorName: error }) : alert('Your info has not been updated');
	}

	createUpdatedUser = () => {
		return Object.assign({}, {
			name: this.state.name,
			email: this.state.email,
			_id: this.state._id
		});
	}

	render() {
		return (
			<div>
				<h3>Edit User</h3>
				<form onSubmit={this.handleUpdate}>
					<div className="form-group">
						<label>Name: </label>
						{this.state.errorName ? <div className="alert alert-danger">{this.state.errorName}</div>
							: null
						}
						<input
							type="text"
							required
							value={this.state.name}
							className="form-control"
							onChange={e => this.onChangeInput(e, 'name')}
							minLength="2"
						/>
					</div>
					<div className="form-group">
						<label>Email: </label>
						<input
							type="email"
							required
							value={this.state.email}
							className="form-control"
							onChange={e => this.onChangeInput(e, 'email')} />
					</div>
					<div className="mb-3">
						<a href="/user/settings/password">To change password click here</a>
					</div>
					<div className="form-group">
						<input type="submit" value="Confirm" className="btn btn-primary" />
					</div>
				</form>
			</div>
		)
	}
}