import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function EditUser(props) {
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
        const response = await fetch(`http://localhost:5000/api/${props.email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + props.token
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

    await fetch(`http://localhost:5000/api/${form.email}`, {
      method: 'PATCH',
      body: JSON.stringify(editUser),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + props.token
      }
    });
  }

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        onClick={handleShow}
      >
        Edit User
      </button>
      {show ? (
        <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed items-center justify-center mt-24 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
            id="overlay"
          ></div>
          <div className="relative bg-white rounded-lg shadow-2xl dark:bg-gray-700">
            <div className="flex justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="ml-5 text-3xl font-semibold text-purple1 dark:text-white"
              >
                {form.email}
              </h3>
              <button type="button" onClick={handleClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </button>
            </div>

            <form
              className="space-y-6 px-5"
              onSubmit={(e) => {
                handleClose();
                e.preventDefault();
                saveModal(e);
              }}
              action="#">

              <div className='p-6 grid grid-cols-2 gap-4'>
                <div className='items-center space-around'>
                  <label htmlFor="name" className="font-bold block mb-2 text-sm text-gray-900 dark:text-white">Email</label>
                  <input
                    className="mb-4 bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-cyan-500 outline-none block p-2.5"
                    id="email"
                    name="email"
                    type="text"
                    value={form.email || ''}
                    contentEditable="true"
                    onChange={(e) => updateForm({ email: e.target.value })}
                  />

                  <label htmlFor="url" className="block font-bold w-1/3 mb-2 text-sm text-gray-900 dark:text-white">Password</label>
                  <input
                    className="indent-10 bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-cyan-500 outline-none block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    id="url"
                    name="url"
                    type="text"
                    value={form.password || ''}
                    contentEditable="true"
                    onChange={(e) => updateForm({ password: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="defaultModal"
                  type="submit"
                  className="transition-all ease-in hover:shadow-xs hover:-translate-y-px w-full bg-purple1 hover:bg-purple2 focus:ring-4 focus:outline-none focus:ring-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
              </div>
            </form>

          </div>
        </div>
      ) : null}
    </div>
  )

}