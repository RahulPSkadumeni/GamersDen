import React, { useState, useEffect } from "react";
import axios from "axios";
import Axios from "../../utils/axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get("users/allUsers").then((res) => {
      setUsers(res.data);
    });
  }, []);
  async function toggleUserStatus(user) {
    const updatedUser = { ...user, status: !user.status };
    const confirm = window.confirm("Are you sure sure?");
    if (confirm) {
      const update = await Axios.put(
        `users/updateUserStatus/${user._id}`,
        updatedUser
      );
      console.log(update);
    }

    setUsers(users.map((u) => (u._id === user._id ? updatedUser : u)));
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border py-2 px-4">Name</th>
            <th className="border py-2 px-4">Email</th>
            <th className="border py-2 px-4">Status</th>
            <th className="border py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border py-2 px-4">
                {user.firstName} {user.lastName}
              </td>
              <td className="border py-2 px-4">{user.email}</td>
              <td className="border px-4 py-2">
                {user.status ? "Active" : "Blocked"}
              </td>
              <td className="border px-4 py-2">
                <button
                  className={`px-4 py-2 ${
                    user.status ? "bg-red-500" : "bg-green-500"
                  } text-white`}
                  onClick={() => toggleUserStatus(user)}
                >
                  {user.status ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
