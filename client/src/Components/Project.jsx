import React from 'react';
import EditProject from './EditProject';


const Project = (props) => {
    return (
        <ul key={props.project._id} className='w-full'>
            <li className='flex justify-between items-center p-5 m-5 border border-gray-100 rounded'>
                <p className=''>{props.project._id}</p>
                <p className=''>{props.project.projName}</p>
                <div className='flex flex-row'>
                    <EditProject projName={props.project.projName} />
                    <button
                        className="text-red-700 bg-red-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            props.deleteProject(props.project.projName)
                        }}
                    >
                        Erase
                    </button>
                </div>
            </li>
        </ul>
    )
}

export default Project;