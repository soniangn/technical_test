import React, { useEffect, useState } from 'react';
import CreateUser from './CreateUser.jsx';
import DeleteUser from './DeleteUser.jsx';
import EditUser from './EditUser.jsx';

function Dashboard() {
  const [users, setUsers] = useState([]);

  const userToken = localStorage.getItem('token');

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await fetch('http://localhost:5000/api/users', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + userToken
        }
      })
      const data = await response.json();
      const userArray = data.users;

      setUsers(userArray);
    };
    getAllUsers();
  }, [])

  const listUsers = (props) => {
    return users.map((user) => {
      return (
        <ul key={user._id} className='flex justify-center w-full'>
          <li className='flex flex-row items-center bg-white shadow-md p-5 m-5'>
            <p className='mr-5'>{user.email}</p>
            <DeleteUser email={user.email} token={userToken} />
            <EditUser email={user.email} token={userToken} />
          </li>
        </ul>
      )
    })
  }

  return (
    <>
      < CreateUser />
      <div className='flex flex-col justify-between text-lg'>{listUsers()}</div>
    </>
  )
}

export default Dashboard