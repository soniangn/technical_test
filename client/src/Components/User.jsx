import React from 'react';
import EditUser from './EditUser';
import PropTypes from 'prop-types';


const User = ({ user, deleteUser, token, onSave }) => {
  return (
    <ul key={user._id} className='w-full'>
      <li className='flex justify-between items-center p-5 m-5 border border-gray-100 rounded'>
        <p>{user._id}</p>
        <p>{user.email}</p>
        <div className='flex flex-row'>
          <EditUser email={user.email} token={token} onSave={onSave} />
          <button
            className="text-red-700 bg-red-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              deleteUser(user.email)
            }}
          >
            Erase
          </button>
        </div>
      </li>
    </ul>
  )
}

export default User;

User.propTypes = {
  user: PropTypes.shape({}).isRequired,
  deleteUser: PropTypes.func.isRequired,
  token: PropTypes.number.isRequired,
  onSave: PropTypes.func.isRequired
}
