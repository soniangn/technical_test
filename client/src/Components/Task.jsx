import React from 'react';
import EditTask from './EditTask';


export const Task = (props) => {
    return (
        <ul key={props.tasks._id} className='w-full'>
            <li className='flex justify-between items-center p-5 m-5 border border-gray-100 rounded'>
                <p className=''>{props.tasks._id}</p>
                <p className=''>{props.tasks.name}</p>
                <div className='flex flex-row'>
                    <EditTask email={props.tasks.name} />
                    <button
                        className="text-red-700 bg-red-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            props.deleteTask(props.tasks.name)
                        }}
                    >
                        Erase
                    </button>
                </div>
            </li>
        </ul>
    )
}
