import React from 'react';
import EditUser from './EditUser';


const User = (props) => {

    return (
        <ul key={props.user._id} className='w-full'>
            <li className='flex justify-between items-center p-5 m-5 border border-gray-100 rounded'>
                <p>{props.user._id}</p>
                <p>{props.user.email}</p>
                <div className='flex flex-row'>
                    <EditUser email={props.user.email} token={props.token} onSave={props.onSave} />
                    <button
                        className="text-red-700 bg-red-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            props.deleteUser(props.user.email)
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
