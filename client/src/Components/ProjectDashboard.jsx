import React from 'react';
import AllProjects from './AllProjects.jsx';

const ProjectDashboard = () => {
  return (
    <>
      <div className='w-full bg-white' >
        <div className='flex justify-center'>
          <h2 className='text-xl font-bold text-gray-800 mb-10 uppercase'>Project Dashboard</h2>
        </div>
        < AllProjects />
      </div>
    </>
  )
}

export default ProjectDashboard;