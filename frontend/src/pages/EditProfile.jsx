import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { user, setUser } = useContext(UserDataContext);
  const [form, setForm] = useState({
    firstname: user.fullname.firstname,
    lastname: user.fullname.lastname || '',
    
    profilePic: user.profilePic || '/profile-icon.png',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
      const token = localStorage.getItem('token');
      
      const res = await axios.put(`${BASE_URL}/api/user/profile/update`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data); // update context
      navigate('/profile');
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <input name="firstname" value={form.firstname} onChange={handleChange} className="w-full p-2 rounded text-black" placeholder="First Name" />
        <input name="lastname" value={form.lastname} onChange={handleChange} className="w-full p-2 rounded text-black" placeholder="Last Name" />
        
        <input name="profilePic" value={form.profilePic} onChange={handleChange} className="w-full p-2 rounded text-black" placeholder="Profile Pic URL" />
        <button type="submit" className="w-full p-2 bg-blue-600 rounded hover:bg-blue-700">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
