import React from 'react';

export default class CreateTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: ''
        }
    }

    onChangeInput = (e, prop) => {
        this.setState({
            [prop]: e.target.value
        })
    }

    onSubmit = async e => {
        e.preventDefault();
        const jsonRes = await fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('user')
            },
            body: JSON.stringify(this.state)
        });
        const res = await jsonRes.json();
        this.handleResponse(res);
    }

    handleResponse = res => {
        const { error } = res;
        !error ? window.location = '/' : console.error(error);
    }

    render() {
        return (
            <div>
                <h3>New Task</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text"
                            required
                            className="form-control"
                            autoComplete="title"
                            value={this.state.title}
                            onChange={e => this.onChangeInput(e, 'title')}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            autoComplete="description"
                            value={this.state.description}
                            onChange={e => this.onChangeInput(e, 'description')}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="submit" 
                            value="Create Task" 
                            className="btn btn-primary" 
                        />
                    </div>
                </form>
            </div>
        )
    }
}
