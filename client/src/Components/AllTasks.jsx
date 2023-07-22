import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Task } from './Task';
import CreateTask from './CreateTask';


const AllTasks = ({ id }) => {
    const [tasks, setTasks] = useState([]);

    const getAllTasks = async () => {
        const response = await fetch(`http://localhost:5000/task/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        const taskArray = data.tasks;

        setTasks(taskArray);
    };

    useEffect(() => {
        getAllTasks();
    }, [tasks, id]);

    const deleteTask = async (task_id) => {
        await fetch(`http://localhost:5000/task/${id}/${task_id}`, {
            method: "DELETE",
        });
        const newListTasks = tasks.filter((task) => task._id !== task_id);
        setTasks(newListTasks);
    }

    const listTasks = () => {
        return tasks.map((task) => {
            return (
                <Task
                    key={task._id}
                    project_id={id}
                    task={task}
                    deleteTask={() => deleteTask(task._id)}
                    onSave={onSave}
                />
            )
        })
    }

    const onSave = (value) => {
        setTasks((prev) => ([...prev, value]));
    }

    return (
        <>
            <CreateTask onSave={onSave} id={id} getAllTasks={getAllTasks} />
            <div className="mt-7 flex justify-center">
                <table className="w-2/3 mx-10 border border-gray-200">
                    <thead className='bg-gray-50 h-10'>
                        <tr className='flex justify-between py-2'>
                            <th className='ml-10 text-left text-gray-500 text-lg font-normal uppercase'>Task Id</th>
                            <th className='ml-10 text-left text-gray-500 text-lg font-normal uppercase'>Name</th>
                            <th className='text-left text-gray-500 text-lg font-normal mr-32 uppercase'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded">
                            <td className='w-full'>{listTasks()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AllTasks

AllTasks.propTypes = {
    id: PropTypes.number.isRequired
}