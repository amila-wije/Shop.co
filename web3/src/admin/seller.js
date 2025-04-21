import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Seller() {
    const [data, setData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post('http://localhost:5000/Login', data);
        if (res.data.status === "ok") {
          localStorage.setItem("token", res.data.token);
          
          navigate("/item");
          return <h1>Welcome {res.data.name}</h1>;
        } else {
          alert("Login failed!");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again later.");
      }
    };
  
  return (
    <div className='items-center justify-center flex flex-col h-screen bg-gray-100'>
      <h1 className='text-center mt-10 font-bold text-4xl mb-7'>Welcome to SHOP.CO</h1>
      <img src="https://th.bing.com/th/id/OIP.3eKgGISBoiSTPa5lrxZErgHaFL?w=276&h=194&c=7&r=0&o=5&pid=1.7" alt="logo" className='w-20 h-20 mb-5' />
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center bg-gray-100">
          <div className="bg-white p-6 rounded shadow-lg w-96"> {/* Added shadow-lg for a stronger drop shadow */}
            <h2 className="font-bold text-2xl mb-4 text-center text-gray-700">Admin Login</h2>
            <input className="mb-5 rounded block mx-auto" type="email" placeholder="Email" onChange={e => setData({ ...data, email: e.target.value })} required />
            <input className="mb-5 rounded block mx-auto" type="password" placeholder="Password" onChange={e => setData({ ...data, password: e.target.value })} required />
            
            <p className="text-gray-600 text-center">Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a></p>
            <div className="flex justify-center mt-4">
              <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded' type="submit">Login</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
  }
  
export default Seller;