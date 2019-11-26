import React from 'react';

export default class UpdatePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            updatedPassword: '',
            hidden: true,
            passwordsMatch: false,
            updatingIsAllowed: false,
            passwordUpdated: false,
        }
    }

    onChangeInput = (e, prop) => {
        this.setState({ [prop]: e.target.value });
        this.resetError();
    }

    async componentDidMount() {
        const jsonUser = await fetch('/user', {
            headers: {
                'token': localStorage.getItem('user'),
                'Content-Type': 'application/json'
            }
        });
        const user = await jsonUser.json();
        this.setState({ name: user.name, _id: user._id });
    }

    handlePasswordComparison = async e => {
        e.preventDefault();
        const jsonRes = await fetch('/user/update/password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.getUser())
        });
        const res = await jsonRes.json();
        this.handlePasswordComparisonResponse(res);
    }

    handlePasswordComparisonResponse = res => {
        const { error } = res;
        !error ? this.handleSuccesfulPasswordComparison() : this.setState({ errorPassword: error });
    }

    handleSuccesfulPasswordComparison = () => {
        this.setState({ passwordsMatch: true }, () => 
            setTimeout(() => {
                this.setState({ updatingIsAllowed: true })
            }, 2000)
        );
    }

    getUser = () => {
        return Object.assign({}, {
            _id: this.state._id,
            password: this.state.password
        });
    }

    updatePassword = async e => {
        e.preventDefault();
        const user = Object.assign({}, { _id: this.state._id, password: this.state.updatedPassword });
        const jsonRes = await fetch('/user/update/password', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const res = await jsonRes.json();
        this.handleUpdatePasswordResponse(res);
    }

    handleUpdatePasswordResponse = res => {
        const { error } = res;
        !error ? this.handleUpdatedPassword() : alert('Password has not been changed');
    }

    handleUpdatedPassword = () => {
        this.setState({ passwordUpdated: true });
        setTimeout(() => {
            window.location = '/';
        }, 2000);
    }

    resetError = () => {
        this.setState({ errorPassword: null });
    }

    render() {
        return (
            <div>
                <p>Hi, {this.state.name} </p>
                {!this.state.updatingIsAllowed ?
                    <>
                        <form onSubmit={this.handlePasswordComparison}>
                            <div className="form-group">
                                <label className="form-check-label">Enter your previous password so we can confirm it is you</label>
                                <input
                                    type={this.state.hidden ? 'password' : 'text'}
                                    autoComplete="password"
                                    className="form-control"
                                    value={this.state.password}
                                    onChange={e => this.onChangeInput(e, 'password')}
                                />
                                {this.state.password.length ?
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="exampleCheck1"
                                            onChange={() => this.setState({ hidden: !this.state.hidden })}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="exampleCheck1">Show/hide password
                                    </label>
                                    </div>
                                    : null}
                            </div>
                            {this.state.errorPassword ? <div className="alert alert-danger">{this.state.errorPassword}</div>
                                : null}
                            <div>
                                <input type="submit" value="Confirm" className="btn btn-primary" />
                            </div>
                        </form>
                        {this.state.passwordsMatch ? <div className="alert alert-success">Password is confirmed</div> : null }
                        <div className="mt-3 text-right">
                            <p>Forgot your password ?</p>
                            <button className="btn btn-info" onClick={() => window.open("/user/login/identify")}>Click here</button>
                        </div>
                    </>
                    : <form onSubmit={this.updatePassword}>
                        <div className="form-group">
                            <label>Enter your new password</label>
                            <input
                                type="password"
                                autoComplete="new-password"
                                className="form-control"
                                value={this.state.updatedPassword}
                                onChange={e => this.onChangeInput(e, 'updatedPassword')}
                            />
                        </div>
                        <div>
                            <input type="submit" value="Confirm" className="btn btn-primary" />
                        </div>
                    </form>
                }
                {this.state.passwordUpdated ? <div className="alert alert-success">Password successfully updated</div>
                    : null}
            </div>
        );
    }
}