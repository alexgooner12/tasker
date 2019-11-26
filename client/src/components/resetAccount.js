import React from 'react';

export default class ResetAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            errorUsername: false,
            errorEmail: false,
            errorPassword: false,
            resetSuccesful: false
        }
    }

    onChangeInput = (e, prop) => {
        this.setState({ [prop]: e.target.value });
        this.resetErrors();
    }

    resetAccount = async e => {
        e.preventDefault();
        const jsonRes = await fetch('/user/reset', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.getUser())
        });
        const res = await jsonRes.json();
        this.handleResetingResponse(res);
    }

    handleResetingResponse = res => {
        const { error } = res;
        !error ? this.handleSuccesfulReseting() : this.handleResetingError(error);
    }

    handleSuccesfulReseting = () => {
        this.setState({ resetSuccesful: true });
        setTimeout(() => localStorage.getItem('user') ? window.location = '/' : window.location = '/user/login', 2000);
    }

    handleResetingError = error => {
        if (error.includes('Email')) this.setState({ errorEmail: error })
        else alert('Account has not been reseted');
    }

    getUser = () => {
        return Object.assign({}, {
            email: this.state.email,
            name: this.state.name,
            password: this.state.password
        });
    }

    resetErrors = () => {
        this.setState({ errorPassword: '', errorUsername: '', errorEmail: '' });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.resetAccount}>
                    <div className="form-group">
                        <label>Enter email</label>
                        {this.state.errorEmail ? <div className="alert alert-danger" role="alert">
                            {this.state.errorEmail}</div> : null}
                        <input
                            type="email"
                            autoComplete="email"
                            className="form-control"
                            value={this.state.email}
                            onChange={e => this.onChangeInput(e, 'email')}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Enter new username</label>
                        {this.state.errorUsername ? <div className="alert alert-danger" role="alert">
                            {this.state.errorUsername}</div> : null}
                        <input
                            type="text"
                            autoComplete="username"
                            className="form-control"
                            value={this.state.name}
                            onChange={e => this.onChangeInput(e, 'name')}
                            minLength="2"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Enter your new password</label>
                        {this.state.errorPassword ? <div className="alert alert-danger" role="alert">
                            {this.state.errorPassword}</div> : null}
                        <input
                            type="password"
                            autoComplete="new-password"
                            className="form-control"
                            value={this.state.password}
                            onChange={e => this.onChangeInput(e, 'password')}
                            minLength="6"
                            required
                        />
                        <br />
                        <input
                            type="submit"
                            value="Reset"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
                {this.state.resetSuccesful ? <div className=" alert alert-success" role="alert">Account has been reseted</div>
                    : null
                }
            </div>
        );
    }
}