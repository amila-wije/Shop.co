import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [data, setData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/register', data);
    alert("Registered successfully!");
    // Redirect to login page after successful registration
    window.location.href = '/';
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-20">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <input
        type="text"
        placeholder="Name"
        onChange={e => setData({ ...data, name: e.target.value })}
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        placeholder="Email"
        onChange={e => setData({ ...data, email: e.target.value })}
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setData({ ...data, password: e.target.value })}
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p className="text-gray-600 text-center mb-4">Already have an account? <a href="/" className="text-blue-500 hover:underline">Login</a></p>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Register
      </button>
    </form>
  );
}
export default Register;
