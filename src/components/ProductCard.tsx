import { TbShoppingBag } from 'react-icons/tb';
import { Product } from '../context/ProductContext';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
    const discountedPrice = product.price * (1 - (product.discount || 0) / 100);

    return (
        <div className="border p-4 rounded-xl shadow">
            <img
                src={product.image}
                alt={product.name}
                className="w-full object-cover bg-[#F2F2F2] mb-4 rounded-lg"
            />
            <div className="px-4 mt-8">
                <h2 className="text-lg text-[#343434] font-semibold mb-2">{product.name}</h2>
                <div className='flex items-center mb-2'>
                    <h3 className="text-[#343434] text-lg font-bold mr-3">
                        &euro;{discountedPrice.toFixed(2)}
                    </h3>
                    <h3 className='text-[#ABABAB] text-lg font-medium line-through mr-3'>
                        &euro;{product.price.toFixed(2)}
                    </h3>
                    <h3 className='text-[#B92E2E] text-lg font-semibold'>
                        {product.discount}% OFF
                    </h3>
                </div>
                <p className="text-[#838383] text-sm mb-10">{product.description}</p>
                <button
                    className="flex items-center justify-center w-full bg-[#202020] text-white py-2 rounded-lg hover:bg-[#303030] transition duration-300"
                    onClick={() => onAddToCart(product)}
                >
                    <TbShoppingBag size={20} color='#fff' className="mr-2" />
                    Add to cart
                </button>
            </div>
        </div>
    );
}
