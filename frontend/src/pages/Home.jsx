import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcSearch } from "react-icons/fc";
import { px } from 'framer-motion';
import Footer from './Footer';

const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div>
    <div className="bg-gray-900 text-white min-h-screen font-sans relative">
      {/* Custom Cursor */}
      <div
        className="cursor fixed w-8 h-8 rounded-full bg-white opacity-20 pointer-events-none transform transition-transform duration-200 ease-out"
        style={{ transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)` }}
      ></div>

      {/* Navbar */}
      <nav className="flex justify-between items-center p-2 bg-gray-700 shadow-md fixed w-full top-0 left-0 z-50">
        <div className="text-2xl font-bold text-blue-500">
          <Link to="/">Logo</Link>
        </div>
        <div className="relative">
          <button onClick={toggleDropdown} className="text-xl">
            <img src="../public/profile-icon.png" alt="Profile" className="w-16 h-16 rounded-full" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
              <ul className="text-gray-200">
                <li><Link to="/profile" className="block px-4 py-2 hover:bg-gray-700">My Profile</Link></li>
                <li><Link to="/search-history" className="block px-4 py-2 hover:bg-gray-700">Search History</Link></li>
                <li><Link to="/edit-profile" className="block px-4 py-2 hover:bg-gray-700">Edit Profile</Link></li>
                <li><button onClick={()=>navigate('/user/logout')} className="block w-full text-left px-4 py-2 hover:bg-gray-700">Logout</button></li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Main Section with Tailwind Animations */}
      <section className="mt-20 bg-gradient-to-br from-blue-900 via-pink-900 to-purple-900 p-6 text-center animate-fadeIn">
        <h1 className="text-5xl font-bold  text-white leading-none tracking-tighter">Welcome to the Our Platform</h1>
        <p className="mt-3 text-sm text-gray-300">Find the most accurate cost predictions and improve your procurement strategy.</p>

      <div className="mt-10 flex justify-center">
    <Link to="/search">
      <button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white tracking-widest font-mono text-lg py-3 px-8 rounded-full shadow-lg hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 ease-in-out">
        SEARCH <FcSearch size={30}/>
      </button>
    </Link>
  </div>
      </section>
      
      {/* Recent Search Section */}
      <section className="py-10 bg-gray-800 transition-transform duration-700 ease-in-out transform hover:scale-105">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-white mb-5">Recent Searches</h2>
          <div className="flex flex-wrap gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-700 p-4 rounded-lg shadow-lg text-white w-full sm:w-1/2 lg:w-1/3 hover:scale-105 transition-transform duration-500">
                <h3 className="text-xl">Recent Search {item}</h3>
                <p className="text-sm">Details about the search</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-10 bg-gray-900 transition-transform duration-700 ease-in-out transform hover:scale-105">
         <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-white mb-5">About Us</h2>
         <div className="flex flex-wrap gap-6 ">
            
         <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/3 hover:rotate-3 hover:scale-105 transition-transform duration-500">
           <img
             src="https://cdn-icons-png.freepik.com/512/7156/7156578.png"
             alt="Our Mission"
             className="w-20 h-20 mb-4 rounded-full"
           />
           <h2 className="text-xl text-blue-400">
             Our Mission
           </h2>
           <p className="text-gray-500 text-sm text-center">
           To empower individuals and organizations to achieve their highest potential through world-class services and solutions
           </p>
         </div>

       
         <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/3 hover:rotate-3 hover:scale-105 transition-transform duration-500">
           <img
             src="https://cdn-icons-png.flaticon.com/512/1465/1465429.png"
             alt="Our Vision"
             className="w-20 h-20 mb-4 rounded-full"
           />
           <h2 className="text-xl text-blue-400">
             Our Vision
           </h2>
           <p className="text-gray-500 text-sm text-center">
             To be a global leader recognized for innovation and quality.
           </p>
         </div>

        
         <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/3 hover:rotate-3 hover:scale-105 transition-transform duration-500">
           <img
             src="https://icons.veryicon.com/png/o/education-technology/management-icon/value-6.png"
             alt="Our Values"
             className="w-20 h-20 mb-4 rounded-full"
           />
           <h2 className="text-xl text-blue-400">
             Our Values
           </h2>
           <p className="text-gray-500 text-sm text-center">
             Integrity, Excellence, and Innovation are at the heart of everything we do.
           </p>
         </div>

         
         <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/3 hover:rotate-3 hover:scale-105 transition-transform duration-500">
           <img
             src="https://cdn-icons-png.flaticon.com/512/5065/5065337.png"
             alt="Our Team"
             className="w-20 h-20 mb-4 rounded-full"
           />
           <h2 className="text-xl text-blue-400">
             Our Team
           </h2>
           <p className="text-gray-500 text-sm text-center">
             A passionate group of individuals working together to create a better future.
           </p>
         </div>
         </div>
        </div>
      </section>
    </div>
    <div className=' w-full overflow-hidden'>
    <Footer/>
    </div>
    </div>
  );
};

export default Home;
