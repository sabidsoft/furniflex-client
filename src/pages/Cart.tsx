import { useCart } from '../context/CartContext';
import { Product } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import useTitle from '../hooks/useTitle';
import CartItem from '../components/CartItem';

export default function Cart() {
    useTitle('Cart');
    const navigate = useNavigate();
    const { cartItems, addToCart, removeFromCart, removeItemFromCart } = useCart();

    // Handle the decrease in item quantity
    const handleDecreaseQuantity = (product: Product) => {
        const item = cartItems.find((item) => item.id === product.id);
        if (item && item.quantity! > 1) {
            removeFromCart(item); // Decrease quantity by one
        } else {
            removeItemFromCart(item!); // Remove item if quantity is 1
        }
    };

    // Handle the increase in item quantity
    const handleIncreaseQuantity = (product: Product) => {
        addToCart(product); // Increase quantity by one
    };

    // Handle the removal of an item from the cart
    const handleRemoveItem = (product: Product) => {
        removeItemFromCart(product); // Remove item entirely from the cart
    };

    // Calculate the discounted price of a product
    const calculateDiscountedPrice = (price: number, discount: number) => {
        return price * (1 - discount / 100);
    };

    // Navigate to the checkout page
    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <>
            <div className="flex mx-24 py-4 mb-24">
                {/* Cart items section */}
                <div className="w-3/4 mr-20">
                    <h2 className="text-2xl text-[#1E1E1E] font-semibold mb-8">An overview of your order</h2>
                    <div className='bg-[#FAFAFA] p-5 pb-0 rounded-xl'>
                        {/* Display message if cart is empty */}
                        {cartItems.length === 0 ? (
                            <p className='pb-5 font-medium'>Your cart is empty</p>
                        ) : (
                            // Map through cart items and display each using CartItem component
                            cartItems.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    handleDecreaseQuantity={handleDecreaseQuantity}
                                    handleIncreaseQuantity={handleIncreaseQuantity}
                                    handleRemoveItem={handleRemoveItem}
                                    calculateDiscountedPrice={calculateDiscountedPrice}
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* Order summary section */}
                <aside className="w-1/4">
                    <h2 className="text-2xl text-[#1E1E1E] font-semibold mb-10">Order details</h2>
                    <div className='bg-[#FAFAFA] p-5 border rounded-xl'>
                        {/* Display subtotal */}
                        <div className='flex justify-between mb-2'>
                            <h5 className='text-[#656565] text-xl'>Subtotal</h5>
                            <h5 className='text-[#656565] text-xl font-medium'>
                                &euro; {cartItems.reduce((total, item) => total + calculateDiscountedPrice(item.price, item.discount || 0) * (item.quantity || 1), 0).toFixed(2)}
                            </h5>
                        </div>

                        {/* Display shipping cost */}
                        <div className='flex justify-between mb-2'>
                            <h5 className='text-[#656565] text-xl'>Shipping</h5>
                            <h5 className='text-[#656565] text-xl font-medium'>Free</h5>
                        </div>

                        {/* Display estimated tax */}
                        <div className='flex justify-between mb-2'>
                            <div className='flex items-center'>
                                <h5 className='text-[#656565] text-xl mr-2'>Estimated Tax</h5>
                            </div>
                            <h5 className='text-[#656565] text-xl font-medium'>&euro; -</h5>
                        </div>

                        {/* Divider */}
                        <hr className='border-[#ECECEC] my-4' />

                        {/* Display total price */}
                        <div className='flex justify-between'>
                            <h5 className='text-[#656565] text-2xl font-semibold'>Total</h5>
                            <h5 className='text-[#656565] text-2xl font-semibold'>
                                &euro; {cartItems.reduce((total, item) => total + calculateDiscountedPrice(item.price, item.discount || 0) * (item.quantity || 1), 0).toFixed(2)}
                            </h5>
                        </div>
                    </div>

                    {/* Checkout button */}
                    <button
                        className="mt-6 w-full bg-[#000] text-white font-medium py-4 rounded-lg hover:bg-[#303030] transition duration-300"
                        onClick={handleCheckout}
                    >
                        Go to Checkout
                    </button>
                </aside>
            </div>

            {/* Footer Component */}
            <Footer />
        </>
    );
}
