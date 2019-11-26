import React from 'react';

class IdentifyUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			email: '',
			error: false
        }
    }

    onChangeInput = (e, prop) => {
		this.setState({
			[prop]: e.target.value,
			error: false
		})
    }
    
    identifyUserByEmail = async e => {
        e.preventDefault();
        const email = Object.assign({}, { email: this.state.email });
        const jsonResponse = await fetch('/user/login/identify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(email)
		});
		const res = await jsonResponse.json();
		this.handleIdentificationResponse(res);
	}
	
	handleIdentificationResponse = response => {
		const { emailSent, error } = response;
		emailSent ? this.handleSuccesfulIdentification(emailSent) : this.setState({ error });
	}

	handleSuccesfulIdentification = emailSent => {
		this.setState({ emailSent }, () => setTimeout(() => window.close(), 3000));
	}

    render() {
        return (
            <div>
                <form onSubmit={this.identifyUserByEmail} >
					<div className="form-group">
						<label>Enter your email and link will be sent to your mailbox</label>
						{this.state.error ?
							<div className="alert alert-danger" role="alert">
								{this.state.error}
							</div>
							: null}
						<input type="email"
							autoComplete="email"
							required
							className="form-control"
							value={this.state.email}
							onChange={e => this.onChangeInput(e, 'email')}
						/>
						{this.state.emailSent ? <div className="alert alert-success" role="alert">
							{this.state.emailSent}
						</div>
						: null}
					</div>
					<div className="form-group">
						<input 
							type="submit" 
							value="Send" 
							className="btn btn-primary" 
						/>
					</div>
				</form>
            </div>
        );
    }
}

export default IdentifyUser;