import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const EditUser = ({ email, token, onSave }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
        })
        const data = await response.json();
        setForm(data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, []);

  const saveModal = async (e) => {
    const editUser = {
      email: form.email,
      password: form.password
    };

    const response = await fetch(`http://localhost:5000/user/${form._id}`, {
      method: 'PATCH',
      body: JSON.stringify(editUser),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });
    const data = await response.json()
    setForm(data);
  }

  return (
    <div>
      <button
        className="mr-5 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        onClick={handleShow}
      >
        Edit user details
      </button>
      {show ? (
        <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed items-center justify-center mt-24 z-50 p-4 md:inset-0">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
            id="overlay"
          ></div>
          <div className='flex justify-center items-center'>
            <div className="relative max-w-xs bg-white rounded-lg shadow-2xl">
              <div className="flex justify-between p-4 border-b rounded-t">
                <h3 className="text-xl font-semibold flex items-center ml-5"
                >
                  Edit details
                </h3>
                <button type="button" onClick={handleClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="defaultModal">
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
              </div>

              <form
                className="space-y-6 px-5"
                onSubmit={(e) => {
                  handleClose();
                  e.preventDefault();
                  saveModal(e);
                  onSave(form);
                }}
                action="#">

                <div className='p-6 grid grid-cols-2 gap-4'>
                  <div className='items-center space-around'>
                    <label htmlFor="name" className="font-bold block mb-2 text-sm text-gray-900">Email</label>
                    <input
                      className="mb-4 bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-cyan-500 outline-none block p-2.5"
                      id="email"
                      name="email"
                      type="text"
                      value={form.email || ''}
                      contentEditable="true"
                      onChange={(e) => updateForm({ email: e.target.value })}
                    />

                    <label htmlFor="url" className="block font-bold w-1/3 mb-2 text-sm text-gray-900">Password</label>
                    <input
                      className="bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-cyan-500 outline-none block p-2.5"
                      id="url"
                      name="url"
                      type="text"
                      contentEditable="true"
                      onChange={(e) => updateForm({ password: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                  <button data-modal-hide="defaultModal"
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white transition-all ease-in hover:shadow-xs hover:-translate-y-px w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default EditUser;

EditUser.propTypes = {
  email: PropTypes.string.isRequired,
  token: PropTypes.number.isRequired,
  onSave: PropTypes.func.isRequired
}