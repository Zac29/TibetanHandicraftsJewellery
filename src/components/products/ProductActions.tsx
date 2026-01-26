"use client";

import { useState } from "react";
import { Product } from "../../lib/products"; // Adjust path as needed
import ContactInfoModal from "../contact/ContactInfoModal";

export default function ProductActions({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
    const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex flex-col gap-[18px]">
      {/* Size Selector */}
      <div>
        <span className="text-[14px] text-[#9F9F9F] block mb-3">Size</span>
        <div className="flex gap-3">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-[30px] h-[30px] flex items-center justify-center rounded-[5px] text-[13px] transition-all ${
                selectedSize === size
                  ? "bg-[#B88E2F] text-white"
                  : "bg-[#F9F1E7] text-black hover:bg-[#B88E2F]/20"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selector */}
      <div>
        <span className="text-[14px] text-[#9F9F9F] block mb-3">Color</span>
        <div className="flex gap-3">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              style={{ backgroundColor: color }}
              className={`w-[30px] h-[30px] rounded-full transition-transform ${
                selectedColor === color ? "scale-125 ring-2 ring-offset-2 ring-[#B88E2F]" : ""
              }`}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Quantity and Buttons */}
      <div className="flex flex-wrap items-center gap-3 mt-4 mb-8">
        {/* Quantity Box */}
        <div className="flex items-center justify-between w-[123px] h-[64px] border border-[#9F9F9F] rounded-[10px] px-4">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="text-[16px]"
          >
            -
          </button>
          <span className="font-medium text-[16px]">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="text-[16px]"
          >
            +
          </button>
        </div>

        {/* Book an Appointment (Contact Button) */}
       <button
  onClick={() => setOpenModal(true)}
  className="
    group relative overflow-hidden
    h-[64px] px-8
    bg-[#353F8C]
    text-white
    rounded-[10px]
    font-bold text-[14px]
    uppercase tracking-[2px]
    transition-all duration-500
    hover:tracking-[4px]
    hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]
    active:scale-[0.97]
  "
>
  <span className="relative z-10">
    Contact Us
  </span>

  {/* Shine animation */}
  <span
    className="
      absolute inset-0
      bg-gradient-to-r from-transparent via-white/30 to-transparent
      translate-x-[-120%]
      group-hover:translate-x-[120%]
      transition-transform duration-700
    "
  />
</button>



        {/* Compare Button */}
        
      </div>
      <ContactInfoModal
  isOpen={openModal}
  onClose={() => setOpenModal(false)}
/>

    </div>
    
  );
}