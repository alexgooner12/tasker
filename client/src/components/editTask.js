import React from 'react';

export default class EditTask extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: ''
		}
	}

	async componentDidMount() {
		const jsonRes = await fetch(`/tasks/${this.props.match.params.id}`, {
			headers: {
				token: localStorage.getItem('user')
			}
		});
		const res = await jsonRes.json();
		this.handleTaskFetching(res);
	}

	handleTaskFetching = res => {
		const { task } = res;
		task ? this.setState({ ...task }) : alert('Could not get task');
	}

	onChangeInput = (e, prop) => {
		this.setState({
			[prop]: e.target.value
		})
	}

	onSubmit = async e => {
		e.preventDefault();
		const jsonRes = await fetch(`/tasks/${this.props.match.params.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('user')
			},
			body: JSON.stringify(this.createTask())
		});
		const res = await jsonRes.json();
		this.handleEditingResponse(res);
	}

	handleEditingResponse = res => {
		const { error } = res;
		!error ? window.location = '/' : alert('Task has not been updated');
	}

	createTask = () => {
		return Object.assign({}, { title: this.state.title, description: this.state.description });
	}

	render() {
		return (
			<div>
				<h3>Edit Task</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Title: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.title}
							onChange={e => this.onChangeInput(e, 'title')}
						/>
					</div>
					<div className="form-group">
						<label>Description: </label>
						<input type="text"
							required
							className="form-control"
							value={this.state.description}
							onChange={e => this.onChangeInput(e, 'description')}
						/>
					</div>
					<div className="form-group">
						<input type="submit" value="Confirm" className="btn btn-primary" />
					</div>
				</form>
			</div>
		)
	}
}