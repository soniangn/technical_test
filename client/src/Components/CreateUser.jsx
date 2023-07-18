import { React, useState } from 'react';

export default function CreateUser() {
  const [form, setForm] = useState({ email: "", password: "" });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const onSubmit = async () => {
    const newUser = { ...form }

    try {
      const response = await fetch("http://localhost:5000/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser)
      })
      const data = await response.json()

    } catch (e) {
      console.error(e);
      throw new Error(e).message;
    };
    setForm({ email: "", password: "" });
  }

  return (
    <>
      <div class="w-full max-w-xs">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" value={form.email} placeholder="Email" onChange={(e) => updateForm({ email: e.target.value })} />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" value={form.password} placeholder="******************" onChange={(e) => updateForm({ password: e.target.value })} />
            <p class="text-red-500 text-xs italic">Please choose a password.</p>
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Create User
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
