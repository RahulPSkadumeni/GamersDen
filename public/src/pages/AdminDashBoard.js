import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BodyComponent from "../components/Body/BodyComponent";
import UserList from "../components/UserList/UserList";
import { setAdminLogout } from "../pages/state";
const AdminDashBoard = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-gray-800 text-white py-4 px-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => dispatch(setAdminLogout())}
          className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-gray-200 p-6">
        {/* <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-bold">Order #1234</h3>
            <p>Customer: John Doe</p>
            <p>Amount: $50</p>
            <p>Status: Pending</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-bold">Order #5678</h3>
            <p>Customer: Jane Smith</p>
            <p>Amount: $100</p>
            <p>Status: Shipped</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-bold">Order #9101</h3>
            <p>Customer: Bob Johnson</p>
            <p>Amount: $75</p>
            <p>Status: Delivered</p>
          </div>
        </div> */}
        <UserList />
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-4 px-6">
        &copy; 2023 My Company
      </div>
    </div>
  );
};

export default AdminDashBoard;
