import { NavLink } from 'react-router-dom';
import brandLogo from '../assets/brand_logo_white.png';
import { LuFacebook, LuInstagram } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import { SlSocialLinkedin } from "react-icons/sl";
import usFlag from '../assets/us.png';

export default function Footer() {
    return (
        <footer className="bg-[#0E0E0E] px-24 pt-24">
            <div className="flex pb-24">
                <div className="w-2/5">
                    <img
                        src={brandLogo}
                        alt="Brand_Logo"
                    />
                </div>

                <div className='w-1/5'>
                    <h3 className='text-white text-lg font-semibold mb-6'>About Us</h3>
                    <ul className='text-[#81859F] text-lg font-semibold'>
                        <li className='mb-1 cursor-pointer'>Master Plan</li>
                        <li className='mb-1 cursor-pointer'>Jobs</li>
                        <li className='mb-1 cursor-pointer'>Invest</li>
                        <li className='mb-1 cursor-pointer'>Pressroom</li>
                        <li className='mb-1 cursor-pointer'>Blog</li>
                        <li className='mb-1 cursor-pointer'>Contact</li>
                    </ul>
                </div>

                <div className='w-1/5'>
                    <h3 className='text-white text-lg font-semibold mb-6'>Explore EEVE</h3>
                    <ul className='text-[#81859F] text-lg font-semibold'>
                        <li className='mb-1 cursor-pointer'>Unlock my Robot Power</li>
                        <li className='mb-1 cursor-pointer'>Starlight</li>
                        <li className='mb-1 cursor-pointer'>Robot Platform</li>
                        <li className='mb-1 cursor-pointer'>EEVE Roadmap</li>
                    </ul>
                </div>

                <div className='w-1/5'>
                    <h3 className='text-white text-lg font-semibold mb-6'>Community & Support</h3>
                    <ul className='text-[#81859F] text-lg font-semibold'>
                        <li className='mb-1 cursor-pointer'>Willow X Community</li>
                        <li className='mb-1 cursor-pointer'>Developer & Maker Access</li>
                        <li className='mb-1 cursor-pointer'>Special Cases</li>
                    </ul>
                </div>
            </div>

            <hr className='border-[#252948]' />

            <div className='flex justify-between py-10'>
                <div className='flex items-center'>
                    <NavLink
                        to={'https://www.facebook.com/'}
                        target='_blank'
                        className='mr-3'
                    >
                        <LuFacebook size={16} color='#DFDFDF' />
                    </NavLink>

                    <NavLink
                        to={'https://www.instagram.com/'}
                        target='_blank'
                        className='mr-3'
                    >
                        <LuInstagram size={16} color='#DFDFDF' />
                    </NavLink>

                    <NavLink
                        to={'https://x.com/'}
                        target='_blank'
                        className='mr-3'
                    >
                        <FaXTwitter size={16} color='#DFDFDF' />
                    </NavLink>

                    <NavLink
                        to={'https://www.linkedin.com/'}
                        target='_blank'
                    >
                        <SlSocialLinkedin size={16} color='#DFDFDF' />
                    </NavLink>
                </div>
                <ul className='flex text-[#81859F] text-lg font-semibold'>
                    <li className='mr-6 cursor-pointer'>March22 Recap</li>
                    <li className='mr-6 cursor-pointer'>Privacy Policy</li>
                    <li className='mr-6 cursor-pointer'>General Terms</li>
                    <li className='mr-6 cursor-pointer'>Contact</li>
                </ul>
                <div className='flex items-center'>
                    <img
                        src={usFlag}
                        alt="US_Flag"
                        className='mr-2'
                    />
                    <p className='text-[#81859F] text-lg font-semibold cursor-pointer'>United States (English)</p>
                </div>
            </div>

            <p className='text-[#323544] text-lg text-center font-semibold pb-8'>EEVE © 2024. All rights reserved.</p>
        </footer>
    );
}