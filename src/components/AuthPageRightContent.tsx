import bgImage from '../assets/bg_image.png';
import brandIcon from '../assets/brand_icon.png';

export default function AuthPageRightContent() {
    return (
        <div
            className='w-1/2 h-screen flex flex-col justify-center items-center bg-cover bg-center'
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <img
                src={brandIcon}
                alt='brand_icon'
                className='mb-3'
            />
            
            <h3 className='text-white text-5xl font-inter font-bold mb-3'>Furni<span className='text-[#1E99F5]'>Flex</span></h3>

            <p className='max-w-lg text-[#C8C4C4] text-center font-medium px-5'>
                Discover a seamless shopping experience with our curated collection of products. From fashion to electronics, we bring quality.
            </p>
        </div>
    );
}