import React, { useState } from 'react';
import axios from 'axios';

function Create({ setTodos }) {
    const [task, setTask] = useState('');

    const handleAdd = () => {
        if (task.trim()) {
            axios.post('http://localhost:3001/add', { task })
                .then(result => {
                    setTask(''); // Clear input field
                    // Optionally, notify parent component of new task
                    setTodos(prevTodos => [...prevTodos, result.data]);
                })
                .catch(err => console.log(err));
        } else {
            console.log('Task cannot be empty');
        }
    };

    return (
        <div className='create_form'>
            <input
                type="text"
                placeholder='Enter Task'
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    );
}

export default Create;
