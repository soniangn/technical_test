import React from 'react';
import AllTasks from './AllTasks.jsx';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const TaskDashboard = () => {
    const location = useLocation();
    const data = location.state;
    const { id } = useParams();

    return (
        <>
            <div className='w-full bg-white' >
                <div className='flex justify-center'>
                    <h2 className='text-xl font-bold text-gray-800 mb-10 uppercase'>{data.name}</h2>
                </div>
                < AllTasks id={id} />
            </div>
        </>
    )
}

export default TaskDashboard;