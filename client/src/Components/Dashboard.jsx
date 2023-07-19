import React from 'react';
import AllUsers from './AllUsers.jsx';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {

  return (
    <div className='w-full bg-white'>
      <div className='flex justify-center'>
        <h2 className='text-xl font-bold text-gray-800 -ml-24 mb-10 uppercase'>Users List</h2>
      </div>
      <AllUsers />
    </div>
  )
}

export default Dashboard;