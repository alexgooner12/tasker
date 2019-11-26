import React from 'react';

export default function Task(props) {
	return (
		<li className="list-group-item">
            <span>Title: {props.task.title}</span><br />
			<span>description: {props.task.description}</span><br />
			<span>
				<button 
					className="btn btn-warning" 
					onClick={() => window.location = `/tasks/edit/${props.task._id}`}>edit
				</button>
				<button 
					className="btn btn-danger" 
					onClick={() => props.deleteTask(props.task._id)}>delete
				</button>
			</span>
		</li>
	)
}