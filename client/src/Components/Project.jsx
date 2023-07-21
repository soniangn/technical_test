import React from 'react';
import PropTypes from 'prop-types';
import EditProject from './EditProject';
import ButtonTasks from './ButtonTasks';
import ButtonGantt from './ButtonGantt';


const Project = ({ project, deleteProject, onSave }) => {
  const projId = project._id;
  const projName = project.projName;

  return (
    <ul key={projId} className='w-full'>
      <li className='flex justify-between items-center p-5 m-5 border border-gray-100 rounded'>
        <p>{projId}</p>
        <p>{projName}</p>
        <div className='flex flex-row'>
          <ButtonGantt id={projId} />
          <ButtonTasks id={projId} name={projName} />
          <EditProject projName={projName} onSave={onSave} />
          <button
            className="text-red-700 bg-red-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              deleteProject(projName)
            }}
          >
            Erase
          </button>
        </div>
      </li>
    </ul>
  )
}

Project.propTypes = {
  project: PropTypes.shape({}).isRequired,
  deleteProject: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}

export default Project;