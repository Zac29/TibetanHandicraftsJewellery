"use client";

import { useState } from "react";
// import { Product } from "../../lib/products"; 
import ContactInfoModal from "../contact/ContactInfoModal";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

type Product = {
  _id: string;
  title: string;
  price: number;
  sizes?: string[];
  colors?: string[];
};


export default function ProductActions({ product }: { product: Product }) {

  const sizes = product.sizes && product.sizes.length > 0 ? product.sizes : ["Standard"];
  const colors = product.colors && product.colors.length > 0 ? product.colors : [];

  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex flex-col gap-10">
      {/* SELECTION ROW */}
      <div className="flex flex-wrap gap-12">
        {/* Size Selector */}
        <div className="space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold block">
            Select Size
          </span>
          <div className="flex gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-10 h-10 flex items-center justify-center text-[11px] transition-all duration-300 border ${
                  selectedSize === size
                    ? "bg-stone-900 text-white border-stone-900 shadow-lg"
                    : "bg-transparent text-stone-600 border-stone-200 hover:border-stone-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selector */}
        <div className="space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold block">
            Artisan Finish
          </span>
          <div className="flex gap-4 items-center h-10">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{ backgroundColor: color }}
                className={`w-6 h-6 rounded-full transition-all duration-500 relative ${
                  selectedColor === color 
                  ? "scale-125 ring-1 ring-offset-4 ring-stone-900 shadow-sm" 
                  : "opacity-60 hover:opacity-100"
                }`}
                title={color}
              >
                {selectedColor === color && (
                   <motion.div 
                    layoutId="activeColor"
                    className="absolute inset-0 rounded-full border border-white/20" 
                   />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ACTION ROW */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Solid Quantity Stepper */}
        <div className="flex items-center bg-[#f3f1ee] h-[60px] px-2 rounded-sm border border-stone-200">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-full flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="w-12 text-center font-medium text-stone-900 text-sm">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-full flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Kinetic Contact Button */}
        <button
          onClick={() => setOpenModal(true)}
          className="
            relative overflow-hidden
            flex-1 h-[60px] px-12
            bg-stone-900 text-white
            text-[11px] font-bold uppercase tracking-[0.3em]
            transition-all duration-500
            hover:bg-amber-800
            hover:shadow-2xl
            active:scale-[0.98]
            w-full sm:w-auto
          "
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            Inquire About This Piece
          </span>
          
          {/* Subtle Gilded Slide */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent -translate-x-full hover:animate-[shimmer_2s_infinite]" />
        </button>
      </div>

      {/* Trust Meta */}
      <div className="pt-2 flex items-center gap-6 opacity-60">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-500">
          <div className="w-1 h-1 rounded-full bg-emerald-500" />
          Authenticity Certified
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-500">
          <div className="w-1 h-1 rounded-full bg-amber-500" />
          Master Artisan Piece
        </div>
      </div>

      <ContactInfoModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}