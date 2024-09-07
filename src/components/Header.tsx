import { NavLink, useNavigate } from 'react-router-dom';
import { TbShoppingBag } from "react-icons/tb";
import { useAuth } from '../context/AuthContext';
import brandLogo from '../assets/brand_logo_black.png';
import profilePicture from '../assets/account.png';
import { useCart } from '../context/CartContext';

export default function Header() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { cartItems } = useCart();

    const goToHomePage = () => {
        navigate('/');
    };

    return (
        <header className="bg-white border-b border-b-[#F1F1F1] py-5">
            <div className="mx-24 py-3 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold text-[#1E99F5]">
                    <img
                        src={brandLogo}
                        alt="Brand_Logo"
                        className="cursor-pointer"
                        onClick={goToHomePage}
                    />
                </div>

                {/* Navigation Links */}
                <nav className="flex justify-center items-center text-lg">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-black text-lg font-medium bg-[#F8F8F8] rounded px-4 py-0.5'
                                : 'text-black text-lg font-medium px-4 py-0.5'
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-black text-lg font-medium bg-[#F8F8F8] rounded px-4 py-0.5'
                                : 'text-black text-lg font-medium px-4 py-0.5'
                        }
                    >
                        Products
                    </NavLink>
                    <NavLink
                        to="/categories"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-black text-lg font-medium bg-[#F8F8F8] rounded px-4 py-0.5'
                                : 'text-black text-lg font-medium px-4 py-0.5'
                        }
                    >
                        Categories
                    </NavLink>
                    <NavLink
                        to="/custom"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-black text-lg font-medium bg-[#F8F8F8] rounded px-4 py-0.5'
                                : 'text-black text-lg font-medium px-4 py-0.5'
                        }
                    >
                        Custom
                    </NavLink>
                    <NavLink
                        to="/blog"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-black text-lg font-medium bg-[#F8F8F8] rounded px-4 py-0.5'
                                : 'text-black text-lg font-medium px-4 py-0.5'
                        }
                    >
                        Blog
                    </NavLink>
                </nav>

                {/* Right Section */}
                <div className="flex items-center space-x-4">
                    {/* Cart Icon */}
                    <NavLink to="/cart" className="relative text-gray-600 hover:text-black">
                        <TbShoppingBag size={40} color='#323232' />
                        {cartItems.length > 0 && (
                            <span className="absolute -bottom-0.5 -right-0.5 bg-[#323232] text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                {cartItems.length}
                            </span>
                        )}
                    </NavLink>

                    {/* Profile Picture and Logout */}
                    {user && (
                        <>
                            <div className="relative">
                                <img src={profilePicture} alt="Profile" className="w-10 h-10 rounded-full" />
                            </div>
                            <button onClick={logout} className="text-black text-lg font-medium bg-[#F8F8F8] rounded px-4 py-0.5 hover:bg-[#eee] duration-300">
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
