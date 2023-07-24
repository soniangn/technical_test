import React from 'react';
import EditTask from './EditTask';
import PropTypes from 'prop-types';


export const Task = ({ project_id, task, deleteTask, onSave }) => {
  return (
    <ul key={task.TaskID} className='w-full'>
      <li className='flex justify-between items-center p-5 m-5 border border-gray-100 rounded'>
        <p>{task.TaskID}</p>
        <p>{task.TaskName}</p>
        <div className='flex flex-row'>
          <EditTask task_id={task._id} project_id={project_id} onSave={onSave} />
          <button
            className="text-red-700 bg-red-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              deleteTask(task._id)
            }}
          >
            Erase
          </button>
        </div>
      </li>
    </ul>
  )
}

Task.propTypes = {
  project_id: PropTypes.string.isRequired,
  task: PropTypes.shape({}).isRequired,
  deleteTask: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}
