import React, { useState } from 'react';

export default function GetUser() {
  const [user, setUser] = useState({ id: "", email: "", password: "" });
  const [show, setShow] = useState(false);

  function updateForm(value) {
    return setUser((prev) => {
      return { ...prev, ...value };
    });
  }

  const id = user.id;

  const handleClick = async () => {
    const response = await fetch(`http://localhost:5000/api/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await response.json();
    updateForm(data);
    setShow(true);
  }

  return (
    <div>
      <div class="w-full max-w-xs">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleClick()
          }}>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
              Enter the user ID to retrieve
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="id" type="text" placeholder="User Id" onChange={(e) => updateForm({ id: e.target.value })} />
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Retrieve User
            </button>
          </div>
        </form>
      </div>
      {show ? (
        <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed items-center justify-center mt-24 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
            id="overlay"
          ></div>
          <div className="max-h-full flex justify-center items-center">
            <div className="relative bg-white rounded-lg shadow-2xl">
              <div className="flex flex-col justify-between p-4 border-b rounded-t">
                <h3 className="text-xl font-semibold text-purple1"
                >
                  User ID: {user.id}
                </h3>
                <p>Email: {user.email} </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}