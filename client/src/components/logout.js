import React from 'react';
import Loader from './loader';

export default class Logout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name:'',
			email: '',
			password: '',
			isLoading: false
		}
	}

	onSubmit = e => {
		e.preventDefault();
		localStorage.removeItem('user');
		this.setState({ isLoading: true });
		setTimeout(() => window.location = '/user/login', 2000);
	}

	render() {
		return (
			<div style={this.state.isLoading ? {'opacity': 0.5} : null}>
				<h3>Are you sure you want to logout ?</h3>
				{ this.state.isLoading ? <Loader /> : null }
				<br />
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<input 
							type="submit" 
							value="Yes" 
							className="btn btn-danger" 
						/>
						<input 
							type="button" 
							value="No" 
							className="btn btn-info" 
							onClick={() => window.location='/'}
						/> 
					</div>      
				</form>
			</div>
		)
	}
}