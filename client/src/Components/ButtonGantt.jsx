import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const ButtonGantt = ({ id }) => {
    return (
        <div>
            <Link to={`/gantt/${id}`} state={id}>
                <button className="text-white bg-green-500 py-2 px-4 mr-5 rounded focus:outline-none focus:shadow-outline">
                    Gantt
                </button>
            </Link>
        </div>
    )
}

export default ButtonGantt;

ButtonGantt.propTypes = {
    id: PropTypes.string.isRequired,
}