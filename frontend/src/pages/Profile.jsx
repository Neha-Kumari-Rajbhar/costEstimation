// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { UserDataContext } from '../context/UserContext';
// import { useNavigate } from 'react-router-dom';
// import Footer from './Footer';
// // import Footer from '../Footer'; // Assuming Footer is in components folder

// const Profile = () => {
//   const { user, setUser } = useContext(UserDataContext);
//   const navigate = useNavigate();

//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     firstname: '',
//     lastname: '',
//     email: '',
//     profilePic: '', // This will hold the URL or base64 string
//   });
//   const [profilePicFile, setProfilePicFile] = useState(null); // To hold the actual file object for preview
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       if (!user || !user._id) {
//         setError('User not authenticated.');
//         setLoading(false);
//         return;
//       }
//       try {
//         const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
//         const response = await axios.get(`${BASE_URL}/users/profile/${user._id}`, {
//           withCredentials: true, // Important for sending cookies (token)
//         });
//         const userData = response.data;
//         setFormData({
//           firstname: userData.fullname.firstname,
//           lastname: userData.fullname.lastname || '',
//           email: userData.email,
//           profilePic: userData.profilePic || '/profile-icon.png', // Set initial profile pic
//         });
//       } catch (err) {
//         console.error('Error fetching user profile:', err);
//         setError('Failed to load profile. Please try again.');
//         if (err.response && err.response.status === 401) {
//           navigate('/login'); // Redirect to login if unauthorized
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, [user, navigate]); // Re-fetch if user object changes or navigate is available

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleProfilePicChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfilePicFile(file); // Store the file for preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData((prevData) => ({
//           ...prevData,
//           profilePic: reader.result, // Set for preview (base64)
//         }));
//       };
//       reader.readAsDataURL(file); // Read file as Data URL (base64)
//     } else {
//       setProfilePicFile(null);
//       setFormData((prevData) => ({
//         ...prevData,
//         profilePic: '/profile-icon.png', // Revert to default if no file selected
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccessMessage('');
//     setLoading(true); // Indicate loading while updating

//     try {
//       const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
//       const response = await axios.post(`${BASE_URL}/users/profile/edit`, formData, { // Using POST as per your backend
//         withCredentials: true,
//       });
//       setUser(response.data); // Update user context with new data
//       setSuccessMessage('Profile updated successfully!');
//       setIsEditing(false); // Exit editing mode
//     } catch (err) {
//       console.error('Error updating profile:', err);
//       setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading && !error) {
//     return (
//       <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
//         <p>Loading profile...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-900 text-white min-h-screen font-sans flex flex-col justify-between">
//       <div className="container mx-auto px-4 py-8 pt-24">
//         <h1 className="text-4xl font-bold text-center mb-8">My Profile</h1>

//         {error && (
//           <div className="bg-red-500 text-white p-3 rounded-md mb-4 text-center">
//             {error}
//           </div>
//         )}
//         {successMessage && (
//           <div className="bg-green-500 text-white p-3 rounded-md mb-4 text-center">
//             {successMessage}
//           </div>
//         )}

//         <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md mx-auto">
//           {isEditing ? (
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="text-center mb-6">
//                 <label htmlFor="profilePicUpload" className="cursor-pointer">
//                   <img
//                     src={profilePicFile ? URL.createObjectURL(profilePicFile) : formData.profilePic || '/profile-icon.png'}
//                     alt="Profile"
//                     className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-blue-500 hover:border-blue-400 transition-all duration-300"
//                   />
//                   <p className="text-blue-400 mt-2 text-sm">Click to change profile picture</p>
//                 </label>
//                 <input
//                   type="file"
//                   id="profilePicUpload"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleProfilePicChange}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="firstname" className="block text-gray-400 text-sm font-bold mb-2">First Name</label>
//                 <input
//                   type="text"
//                   id="firstname"
//                   name="firstname"
//                   value={formData.firstname}
//                   onChange={handleChange}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="lastname" className="block text-gray-400 text-sm font-bold mb-2">Last Name (Optional)</label>
//                 <input
//                   type="text"
//                   id="lastname"
//                   name="lastname"
//                   value={formData.lastname}
//                   onChange={handleChange}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="email" className="block text-gray-400 text-sm font-bold mb-2">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
//                 />
//               </div>
//               <div className="flex items-center justify-between">
//                 <button
//                   type="submit"
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
//                   disabled={loading}
//                 >
//                   {loading ? 'Saving...' : 'Save Changes'}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setIsEditing(false)}
//                   className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <div className="space-y-4">
//               <div className="text-center mb-6">
//                 <img
//                   src={formData.profilePic || '/profile-icon.png'}
//                   alt="Profile"
//                   className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-blue-500"
//                 />
//               </div>
//               <p className="text-lg">
//                 <span className="font-semibold text-gray-300">Name:</span> {formData.firstname} {formData.lastname}
//               </p>
//               <p className="text-lg">
//                 <span className="font-semibold text-gray-300">Email:</span> {formData.email}
//               </p>
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
//               >
//                 Edit Profile
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer/>
//     </div>
//   );
// };

// export default Profile;


import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Profile = () => {
  const { user,setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    profilePic: '',
  });
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
        const res = await axios.get(`${BASE_URL}/users/profile`, {
          withCredentials: true,
        });

        const userData = res.data.user;
        setFormData({
          firstname: userData.fullname.firstname,
          lastname: userData.fullname.lastname || '',
          email: userData.email,
          profilePic: userData.profilePic || 'default-avatar.png',
        });
        setUser(userData);
        setError('');
      } catch (err) {
        console.error(err);
        setError('User not authenticated or server error.');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate, setUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setFormData((prev) => ({ ...prev, profilePic: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
      const formPayload = new FormData();
      formPayload.append('firstname', formData.firstname);
      formPayload.append('lastname', formData.lastname);
      formPayload.append('email', formData.email);
      if (profilePicFile) {
        formPayload.append('profilePic', profilePicFile);
      }

      const res = await axios.put(`${BASE_URL}/users/profile`, formPayload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const updatedUser = res.data.user;
      setUser(updatedUser);
      setFormData({
        firstname: updatedUser.fullname.firstname,
        lastname: updatedUser.fullname.lastname || '',
        email: updatedUser.email,
        profilePic: updatedUser.profilePic || 'default-avatar.png',
      });
      setSuccessMessage('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setError('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white text-center py-20">Loading profile...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-between">
      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-4xl font-bold text-center mb-8">My Profile</h1>

        {error && <div className="bg-red-500 text-white p-3 rounded-md mb-4 text-center">{error}</div>}
        {successMessage && <div className="bg-green-500 text-white p-3 rounded-md mb-4 text-center">{successMessage}</div>}

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md mx-auto">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <label htmlFor="profilePicUpload" className="cursor-pointer">
                  <img
                    src={formData.profilePic.startsWith('blob') ? formData.profilePic : `http://localhost:3000/uploads/${formData.profilePic}`}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-blue-500 hover:border-blue-400 transition-all duration-300"
                  />
                  <p className="text-blue-400 mt-2 text-sm">Click to change profile picture</p>
                </label>
                <input
                  type="file"
                  id="profilePicUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePicChange}
                />
              </div>

              <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600" />
              <input type="text" name="lastname" placeholder="Last Name (optional)" value={formData.lastname} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600" />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600" />

              <div className="flex items-center justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4">
              {/* <img
                src={`http://localhost:5000/uploads/${formData.profilePic}`}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-blue-500"
              /> */}
              <div className="text-center mb-6">
                <img
                  src={formData.profilePic || '/profile-icon.png'}
                  alt="Profile"
                 className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-blue-500"
               />
              </div>
              <p className="text-lg font-semibold">Name: {formData.firstname} {formData.lastname}</p>
              <p className="text-lg font-semibold">Email: {formData.email}</p>
              <button onClick={() => setIsEditing(true)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Edit Profile</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
