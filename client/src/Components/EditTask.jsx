import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../AuthContext';



const EditTask = ({ project_id, task_id, onSave }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [form, setForm] = useState({
    TaskID: "",
    TaskName: "",
    StartDate: "",
    EndDate: "",
    Progress: ""
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const { dispatchAPI } = useAuth();

  const fetchData = async () => {
    try {
      const response = await dispatchAPI(`task/${project_id}/${task_id}`, "GET");
      const data = await response.json();
      const task = data.task;
      setForm(task);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveModal = async (e) => {
    const editTask = {
      TaskID: form.TaskID,
      TaskName: form.TaskName,
      StartDate: form.StartDate,
      EndDate: form.EndDate,
      Progress: form.Progress
    };

    await dispatchAPI(`task/${project_id}/${task_id}`, "PATCH", JSON.stringify(editTask));
  }

  return (
    <div>
      <button
        className="mr-5 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        onClick={handleShow}
      >
        Edit Task
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
                  Edit Task
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
                    <label htmlFor="name" className="font-bold block mb-2 text-sm text-gray-900">Id</label>
                    <input
                      className="bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-cyan-500 outline-none block p-2.5"
                      id="id"
                      name="id"
                      type="text"
                      value={form.TaskID || ''}
                      contentEditable="true"
                      onChange={(e) => updateForm({ TaskID: e.target.value })}
                    />
                  </div>
                </div>

                <div className='px-6 grid grid-cols-2 gap-4'>
                  <div className='items-center space-around'>
                    <label htmlFor="name" className="font-bold block mb-2 text-sm text-gray-900">Name</label>
                    <input
                      className="mb-4 bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-cyan-500 outline-none block p-2.5"
                      id="name"
                      name="name"
                      type="text"
                      value={form.TaskName || ''}
                      contentEditable="true"
                      onChange={(e) => updateForm({ TaskName: e.target.value })}
                    />
                  </div>
                </div>

                <div className='px-6 grid grid-cols-2 gap-4'>
                  <div className='items-center space-around'>
                    <label htmlFor="start-date" className="font-bold block mb-2 text-sm text-gray-900">Start Date</label>
                    <input
                      className="mb-4 bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-cyan-500 outline-none block p-2.5"
                      id="start-date"
                      name="start-date"
                      type="date"
                      value={form.StartDate || ''}
                      contentEditable="true"
                      onChange={(e) => updateForm({ StartDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className='px-6 grid grid-cols-2 gap-4'>
                  <div className='items-center space-around'>
                    <label htmlFor="end-date" className="font-bold block mb-2 text-sm text-gray-900">End Date</label>
                    <input
                      className="mb-4 bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-cyan-500 outline-none block p-2.5"
                      id="end-date"
                      name="end-date"
                      type="date"
                      value={form.EndDate || ''}
                      contentEditable="true"
                      onChange={(e) => updateForm({ EndDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className='px-6 grid grid-cols-2 gap-4'>
                  <div className='items-center space-around'>
                    <label htmlFor="progress" className="font-bold block mb-2 text-sm text-gray-900">Progress</label>
                    <input
                      className="mb-4 bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-cyan-500 outline-none block p-2.5"
                      id="progress"
                      name="progress"
                      type="text"
                      value={form.Progress || ''}
                      contentEditable="true"
                      onChange={(e) => updateForm({ Progress: e.target.value })}
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

export default EditTask;

EditTask.propTypes = {
  project_id: PropTypes.number.isRequired,
  task_id: PropTypes.number.isRequired,
  onSave: PropTypes.func.isRequired
}