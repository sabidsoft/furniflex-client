import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../assets/google_icon.png';
import appleIcon from '../assets/apple_icon.png';
import { useAuth } from '../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AuthPageRightContent from '../components/AuthPageRightContent';
import useTitle from '../hooks/useTitle';

interface LoginFormData {
    email: string;
    password: string;
    agreeTerms: boolean;
}

export default function Login() {
    useTitle('Login');
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
        agreeTerms: false,
    });
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.agreeTerms) {
            setError("You must agree to the terms and policy.");
            return;
        }

        try {
            setError(null);
            setIsLoading(true);
            await login(formData.email, formData.password);
            navigate('/products');
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const goToTermsAndPolicyPage = () => {
        navigate('/terms-and-policy');
    };

    const goToSignUpPage = () => {
        navigate('/signup');
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className='flex justify-between'>
            <div className='w-1/2 h-screen flex flex-col justify-center items-center'>
                <div className='w-[500px] mx-auto bg-[#FAFAFA] border border-[#F5F5F5] px-5 py-14 rounded-lg'>
                    <h3 className='text-3xl text-black font-semibold'>Welcome Back!</h3>
                    <h6 className='text-[#707070] font-medium mb-10'>Enter your Credentials to access your account</h6>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col bg-white border border-[#DEDEDE] rounded px-3 py-1.5 mb-3'>
                            <label htmlFor='email' className='text-[#707070] text-xs mb-1'>Email address</label>
                            <input
                                id='email'
                                type="email"
                                value={formData.email}
                                placeholder='Enter your email'
                                onChange={handleChange}
                                required
                                className='focus:outline-none text-sm text-black placeholder-black'
                            />
                        </div>
                        <div className='flex flex-col bg-white border border-[#DEDEDE] rounded px-3 py-1.5 mb-1 relative'>
                            <label htmlFor='password' className='text-[#707070] text-xs mb-1'>Password</label>
                            <input
                                id='password'
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                placeholder='Enter your password'
                                onChange={handleChange}
                                required
                                className='focus:outline-none text-sm text-black placeholder-black pr-10'
                            />
                            <div
                                className='absolute inset-y-0 right-3 flex items-center cursor-pointer'
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEye size={24} color='#707070' /> : <FaEyeSlash size={24} color='#707070' />}
                            </div>
                        </div>
                        <p className='text-[#1E99F5] text-sm text-end font-medium cursor-pointer mb-3'>Forgot Password</p>
                        <div className='flex items-center mb-5'>
                            <input
                                id='agreeTerms'
                                type="checkbox"
                                checked={formData.agreeTerms}
                                onChange={handleChange}
                                required
                                className='w-4 h-4 text-[#1E99F5] focus:outline-none focus:ring-0 focus:border-none'
                            />
                            <label htmlFor='agreeTerms' className='ml-2 text-sm text-black font-medium'>
                                I agree to the <span onClick={goToTermsAndPolicyPage} className='underline'>Terms & Policy</span>
                            </label>
                        </div>
                        {error && <p className='text-red-500 text-center mb-3'>{error}</p>}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-[#333] transition duration-200 mb-3 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    <div className='relative mb-3'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-gray-300'></div>
                        </div>
                        <div className='relative flex justify-center text-xs'>
                            <span className='px-2 bg-[#FAFAFA] text-black font-medium'>or</span>
                        </div>
                    </div>
                    <div className='flex justify-between mb-5'>
                        <button className='w-[49%] py-3 bg-white text-black border text-xs border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition duration-200 flex items-center justify-center'>
                            <img src={googleIcon} alt="Google_Icon" className='w-[24px] mr-5' />
                            Sign in with Google
                        </button>
                        <button className='w-[49%] py-3 bg-white text-black border text-xs border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition duration-200 flex items-center justify-center'>
                            <img src={appleIcon} alt="Apple_Icon" className='w-[24px] mr-5' />
                            Sign in with Apple
                        </button>
                    </div>
                    <p className='text-black text-sm text-center font-medium'>
                        Don't have an account? <span onClick={goToSignUpPage} className='text-[#0F3DDE] cursor-pointer'>Sign Up</span>
                    </p>
                </div>
            </div>
            <AuthPageRightContent />
        </div>
    );
}
