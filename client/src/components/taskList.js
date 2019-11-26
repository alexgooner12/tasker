import React from 'react';
import Task from './task';
import Loader from './loader';

class TaskList extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            title: '',
            description: '',
            isLoading: false
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        this.setState({ isLoading: true });
        const jsonResponse = await fetch('/tasks', {
            headers: {
                token: localStorage.getItem('user')
            }
        });
        const response = await jsonResponse.json();
        this.handleTaskListFetching(response);
    }

    handleTaskListFetching = res => {
        const { tasks, error } = res;
        setTimeout(() => this.setState({ isLoading: false }), 1000);
        !error ? this.setState({ tasks }) : alert('Error no tasks have been fetched');
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleDeleteTask = async id => {
        const jsonResponse = await fetch(`/tasks/${id}`, {
            method: 'DELETE',
            body: JSON.stringify(id)
        });
        const response = await jsonResponse.json();
        this.handleDeletionResponse(response);
    }

    handleDeletionResponse = res => {
        const { error } = res;
        !error ? window.location = '/' : alert('Task has not been deleted');
    }

    render() {
        return (
            <div>
                <ul className="list-group text-center">{this.state.isLoading ? <div><Loader /></div> : null}
                    {
                        this.state.tasks.length ?
                            this.state.tasks.map(task => {
                                return <Task 
                                            key={task._id} 
                                            task={task} 
                                            deleteTask={() => this.handleDeleteTask(task._id)} 
                                        />
                            })
                            : <li className="list-group-item">No tasks have yet been created</li>
                    }
                </ul>
            </div>
        );
    }
}

export default TaskList;