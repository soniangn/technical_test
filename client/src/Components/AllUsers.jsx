import React, { useEffect, useState } from 'react';
import User from './User.jsx';
import CreateUser from './CreateUser.jsx';
import { useAuth } from '../AuthContext.js';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const userToken = localStorage.getItem('token');

  const { dispatchAPI } = useAuth();

  const getAllUsers = async () => {
    const response = await dispatchAPI('user/users', "GET")
    const data = await response.json();

    const userArray = data.users;

    setUsers(userArray);
  };

  useEffect(() => {
    getAllUsers();
  }, [users])

  const deleteUser = async (email) => {
    await dispatchAPI(`user/${email}`, "DELETE")
    const newListUsers = users.filter((user) => user.email !== email);
    setUsers(newListUsers);
  }

  const listUsers = () => {
    return users.map((user) => {
      return (
        <User
          key={user._id}
          user={user}
          deleteUser={() => deleteUser(user.email)}
          token={userToken}
          onSave={onSave}
        />
      )
    })
  }

  const onSave = (value) => {
    setUsers((prev) => ([...prev, value]));
  }

  return (
    <>
      < CreateUser onSave={onSave} />
      <div className="mt-7 flex justify-center">
        <table className="w-2/3 mx-10 border border-gray-200">
          <thead className='bg-gray-50 h-10'>
            <tr className='flex justify-between py-2'>
              <th className='ml-10 text-left text-gray-500 text-lg font-normal uppercase'>User Id</th>
              <th className='ml-10 text-left text-gray-500 text-lg font-normal uppercase'>Email</th>
              <th className='text-left text-gray-500 text-lg font-normal mr-32 uppercase'>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded">
              <td className='w-full'>{listUsers()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AllUsers;
