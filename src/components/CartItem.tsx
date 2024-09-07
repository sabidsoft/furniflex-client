import React from 'react';
import { Product } from '../context/ProductContext';
import { RxCross2 } from 'react-icons/rx';

interface CartItemProps {
  item: Product;
  handleDecreaseQuantity: (product: Product) => void;
  handleIncreaseQuantity: (product: Product) => void;
  handleRemoveItem: (product: Product) => void;
  calculateDiscountedPrice: (price: number, discount: number) => number;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  handleRemoveItem,
  calculateDiscountedPrice,
}) => {
  // Calculate the discounted price for the item
  const discountedPrice = calculateDiscountedPrice(item.price, item.discount || 0);

  return (
    <div className="border-b mb-5 pb-5">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="mr-3">
            <div className="px-3 py-1 border rounded">
              <span
                className="text-[#CFCFCF] text-xl font-medium mr-2 cursor-pointer"
                onClick={() => handleDecreaseQuantity(item)}
              >
                -
              </span>
              <span className="text-xl text-[#0E0E0E] font-semibold mr-2">{item.quantity}</span>
              <span
                className="text-[#CFCFCF] text-xl font-medium cursor-pointer"
                onClick={() => handleIncreaseQuantity(item)}
              >
                +
              </span>
            </div>
          </div>
          <div className="flex">
            <img
              src={item.image}
              alt={item.name}
              width={88}
              height={88}
              className="bg-[#F2F2F2] border rounded-lg p-1 mr-4"
            />
            <h4 className="text-[#434343] font-bold">{item.name}</h4>
          </div>
        </div>
        <div>
          <RxCross2
            size={24}
            color="#939393"
            onClick={() => handleRemoveItem(item)}
            className="cursor-pointer"
          />
        </div>
      </div>
      <h3 className="text-[#0E0E0E] text-end text-xl font-semibold">
        &euro;{(discountedPrice * (item.quantity || 1)).toFixed(2)}
      </h3>
    </div>
  );
};

export default CartItem;
