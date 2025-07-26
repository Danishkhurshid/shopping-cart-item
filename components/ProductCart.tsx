"use client";

import { useState } from "react";
import Button from "./Button";

type Product = {
  id: number;
  name: string;
  price: number;
  isGift?: boolean;
};

type CartItem = Product & { qty: number };

const PRODUCTS: Product[] = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT: Product = {
  id: 99,
  name: "Wireless Mouse",
  price: 0,
  isGift: true,
};

const THRESHOLD = 1000;

const ProductCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const subtotal = cart.reduce(
    (sum, item) => (item.id === FREE_GIFT.id ? sum : sum + item.price * item.qty),
    0
  );

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  const handleCartQtyChange = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.qty + delta > 0
            ? { ...item, qty: item.qty + delta }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const handleRemoveQty = (id: number) => {
    if (id === FREE_GIFT.id) return;
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const percent = Math.min((subtotal / THRESHOLD) * 100, 100);

  return (
    <div className="text-gray-900 min-h-screen max-w-6xl mx-auto font-sans bg-gray-50 p-6">
      {/* Products */}
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Products</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {PRODUCTS.map((prod) => (
          <li
            key={prod.id}
            className="bg-white border-gray-300 rounded-lg p-6 flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{prod.name}</h2>
              <p className="text-gray-600 mt-2">{prod.price}</p>
            </div>
            <Button
              type="add"
              onClick={() => handleAddToCart(prod)}
              ariaLabel={`Add ${prod.name} to cart`}
              className="mt-3"
            >
              Add to cart
            </Button>
          </li>
        ))}
      </ul>

      {/* Progress Bar */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900 mt-6">Cart Summary</h2>
      <section className="bg-white border border-gray-300 rounded-lg p-6 shadow-md mt-4">
        <div className="font-semibold text-lg text-gray-900 mb-3 flex justify-between">
          <p>Subtotal</p>
          <p>{subtotal}</p>
        </div>
        <p className="mb-3 text-gray-700">
          {subtotal >= THRESHOLD
            ? "You got a free wireless mouse"
            : `You're ${THRESHOLD - subtotal} bucks away from free gift!`}
        </p>
        <div className="w-full bg-gray-200 rounded h-5 border border-gray-300 overflow-hidden">
          <div
            className="h-5 transition-all duration-300 bg-blue-600"
            style={{ width: `${percent}%` }}
          />
        </div>
      </section>

      {/* Cart Items */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900 mt-6">Cart Items</h2>
      <section className="bg-white border border-gray-300 rounded-lg p-6 shadow-md mt-4">
        {cart.length === 0 ? (
          <div className="text-center">
            <h3 className="text-gray-600">Your cart is empty</h3>
            <p className="italic">Add some products to see them</p>
          </div>
        ) : (
          <div>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border border-gray-300 rounded-lg p-4 mt-4"
              >
                <div>
                  <div className="text-lg">{item.name}</div>
                  <div className="text-gray-700 mt-1">
                    {item.qty} * {item.price} ={" "}
                    <span className="font-semibold">{item.qty * item.price}</span>
                  </div>
                </div>
                {!item.isGift && (
                  <div className="flex items-center justify-between gap-3">
                    <Button
                      type="increment"
                      onClick={() => handleCartQtyChange(item.id, 1)}
                      ariaLabel={`increase ${item.name} qty`}
                    >
                      +
                    </Button>
                    {item.qty}
                    <Button
                      type="decrement"
                      onClick={() => handleCartQtyChange(item.id, -1)}
                      ariaLabel={`decrease ${item.name} qty`}
                      disabled={item.qty <= 1}
                    >
                      -
                    </Button>
                    <Button
                      type="remove"
                      onClick={() => handleRemoveQty(item.id)}
                      ariaLabel={`remove ${item.name} from cart`}
                    >
                      &times;
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductCart;
