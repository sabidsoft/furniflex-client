import { useState } from 'react';
import { useProduct, Product } from '../context/ProductContext';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';
import useTitle from '../hooks/useTitle';
import ProductCard from '../components/ProductCard';

export default function Products() {
    useTitle('Products');
    const { products: rockingChair } = useProduct();
    const { addToCart } = useCart();

    // State to manage the active menu selection ('rockingChair', 'sideChair', or 'loungeChair')
    const [activeMenu, setActiveMenu] = useState<'rockingChair' | 'sideChair' | 'loungeChair'>('rockingChair');

    // Object containing products for each menu category
    const products = {
        rockingChair: rockingChair,
        sideChair: [],
        loungeChair: [],
    };

    // Handle menu click to switch between categories
    const handleMenuClick = (menu: 'rockingChair' | 'sideChair' | 'loungeChair') => {
        setActiveMenu(menu);
    };

    // Handle adding a product to the cart and show a toast notification
    const handleAddToCart = (product: Product) => {
        addToCart(product);
        toast.success(`${product.name} added to cart!`, {
            position: 'top-center',
        } as ToastOptions);
    };

    return (
        <>
            <div className="flex m-24">
                {/* Aside bar for category selection */}
                <aside className="w-1/4 mr-10 pt-8 pe-8 border-r">
                    <ul>
                        {/* Rocking Chair Menu Item */}
                        <li
                            className={`text-xl font-medium px-5 py-2 cursor-pointer ${activeMenu === 'rockingChair' ? 'bg-[#0E0E0E] text-white font-semibold rounded-lg' : 'text-[#717171]'}`}
                            onClick={() => handleMenuClick('rockingChair')}
                        >
                            Rocking Chair
                        </li>
                        <hr className='my-4 border-[#F4F4F4]' />

                        {/* Side Chair Menu Item */}
                        <li
                            className={`text-xl font-medium px-5 py-2 cursor-pointer ${activeMenu === 'sideChair' ? 'bg-[#0E0E0E] text-white font-semibold rounded-lg' : 'text-[#717171]'}`}
                            onClick={() => handleMenuClick('sideChair')}
                        >
                            Side Chair
                        </li>
                        <hr className='my-4 border-[#F4F4F4]' />

                        {/* Lounge Chair Menu Item */}
                        <li
                            className={`text-xl font-medium px-5 py-2 cursor-pointer ${activeMenu === 'loungeChair' ? 'bg-[#0E0E0E] text-white font-semibold rounded-lg' : 'text-[#717171]'}`}
                            onClick={() => handleMenuClick('loungeChair')}
                        >
                            Lounge Chair
                        </li>
                    </ul>
                </aside>

                {/* Product cards display area */}
                <div className="w-3/4">
                    {/* Display a message if no products are available in the selected category */}
                    {products[activeMenu].length === 0 && (
                        <h4 className="text-lg text-black font-medium">
                            Products is empty
                        </h4>
                    )}

                    {/* Grid layout to display product cards */}
                    <div className="grid grid-cols-3 gap-y-20 gap-x-8">
                        {/* Loop through products in the active category and display each product using the ProductCard component */}
                        {products[activeMenu].length > 0 &&
                            products[activeMenu].map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={handleAddToCart}
                                />
                            ))}
                    </div>
                </div>
            </div>

            {/* Footer Component */}
            <Footer />

            {/* Toast container to display notifications */}
            <ToastContainer />
        </>
    );
}
