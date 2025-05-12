import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  const navigate = useNavigate();

  // Debugging: Check if user is being set correctly
  console.log("User Data in Navbar:", user);
  console.log("Token in Navbar:", localStorage.getItem('token'));

  return (
    <div className="flex items-center justify-between py-4">
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        className="w-28 sm:w-32 lg:w-40 cursor-pointer"
      />

      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-2">
            <button className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-2 sm:py-4 rounded-full hover:scale-105 transition-all duration-500">
              <img className="w-5" src={assets.credit_star} alt="Credits" />
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Credits left: {credit}
              </p>
            </button>
            <p className="text-gray-600 max-sm:hidden pl-4">Hi,{user.name}</p>

            <div className="relative group">
              <img className="w-10 drop-shadow cursor-pointer" src={assets.profile_icon} alt="Profile" />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12 cursor-pointer">
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                  <li onClick={logout} className="px-2 py-1 hover:bg-gray-100 rounded-md">Logout</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <p onClick={() => navigate('/buy')} className="cursor-pointer">Pricing</p>
            <button
              className="bg-zinc-800 text-white py-2 px-7 sm:px-10 rounded-full text-sm"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
