import { React, useState } from 'react';

export default function DeleteUser(props) {
    const [form, setForm] = useState("");

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    const deleteByEmail = async () => {
        await fetch(`http://localhost:5000/api/${props.email}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + props.token
            }
        })
    }

    return (
        <div>
            <div class="w-full max-w-xs">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    deleteByEmail()
                }}>
                    <div class="flex items-center justify-between">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Erase User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}