import React, { useState, useEffect } from 'react';
import CreateProject from './CreateProject';
import Project from './Project';
import { useAuth } from '../AuthContext';

const AllProjects = ({ id }) => {
  const [projects, setProjects] = useState([]);

  const { dispatchAPI } = useAuth();

  const getAllProjects = async () => {

    const response = await dispatchAPI('proj/all', "GET")
    const data = await response.json();
    const projectArray = data.projects;

    setProjects(projectArray);
  };

  useEffect(() => {
    getAllProjects();
  }, [projects])

  const deleteProject = async (name) => {
    await dispatchAPI(`proj/${name}`, "DELETE")

    const newListProjects = projects.filter((project) => project.projName !== name);
    setProjects(newListProjects);
  }

  const listProjects = () => {
    return projects.map((project) => {
      return (
        <Project
          key={project._id}
          project={project}
          deleteProject={() => deleteProject(project.projName)}
          onSave={onSave}
        />
      )
    })
  }

  const onSave = (value) => {
    setProjects((prev) => ([...prev, value]));
  }

  return (
    <>
      < CreateProject onSave={onSave} />
      <div className="mt-7 flex justify-center">
        <table className="w-2/3 mx-10 border border-gray-200">
          <thead className='bg-gray-50 h-10'>
            <tr className='flex justify-between py-2'>
              <th className='ml-10 text-left text-gray-500 text-lg font-normal uppercase'>Project Id</th>
              <th className='ml-10 text-left text-gray-500 text-lg font-normal uppercase'>Name</th>
              <th className='text-left text-gray-500 text-lg font-normal mr-32 uppercase'>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded">
              <td className='w-full'>{listProjects()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AllProjects;