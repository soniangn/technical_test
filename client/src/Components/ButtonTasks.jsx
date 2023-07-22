import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const ButtonTasks = ({ id, name }) => {
    const projData = {
        id: id,
        name: name
    }

    return (
        <div>
            <Link to={`/tasks-dashboard/${id}`} state={projData}>
                <button className="text-white bg-green-500 py-2 px-4 mr-5 rounded focus:outline-none focus:shadow-outline">
                    Dashboard
                </button>
            </Link>
        </div>
    )
}

export default ButtonTasks;

ButtonTasks.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
}