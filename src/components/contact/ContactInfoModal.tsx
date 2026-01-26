"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ContactInfoModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center px-4"
    >
      {/* Modal Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative w-full max-w-[440px]
          bg-white/80 backdrop-blur-xl
          border border-white/40
          rounded-[18px]
          shadow-[0_40px_80px_rgba(0,0,0,0.25)]
          p-8
        "
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-[22px] text-gray-500 hover:text-black transition"
        >
          ✕
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-5">
          <Image
            src="/logo.png"
            alt="Shop Logo"
            width={130}
            height={60}
            className="object-contain"
          />
        </div>

        {/* Shop Name */}
        <div className="text-center mb-6">
          <h2 className="text-[22px] font-semibold text-[#2E2E2E] tracking-wide">
            Tibetan Handicraft & Jewellery
          </h2>
          <p className="text-gray-600 text-[13px] mt-1">
            Authentic Tibetan Handicrafts & Spiritual Items
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6" />

        {/* Contact Details */}
        <div className="space-y-4 text-[15px]">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">📞 Mobile</span>
            <a href="tel:+919999999999" className="font-medium text-[#B88E2F]">
              +91 99999 99999
            </a>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">💬 WhatsApp</span>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              className="font-medium text-[#B88E2F]"
            >
              Chat Now
            </a>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">✉️ Email</span>
            <a
              href="mailto:shop@email.com"
              className="font-medium text-[#B88E2F]"
            >
              shop@email.com
            </a>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">📍 Location</span>
            <span className="font-medium text-[#2E2E2E]">
              Bodh Gaya, Bihar, India
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-7" />

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3">
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            className="
              h-[52px]
              flex items-center justify-center
              rounded-[10px]
              bg-[#25D366]
              text-white font-semibold
              shadow-md hover:opacity-90 transition
            "
          >
            Message on WhatsApp
          </a>

          <Link
            href="/contact"
            onClick={onClose}
            className="
              h-[52px]
              flex items-center justify-center
              rounded-[10px]
              bg-[#2E2E2E]
              text-white font-semibold
              tracking-wide
              shadow-md hover:opacity-90 transition
            "
          >
            Send Message
          </Link>
        </div>
      </div>
    </div>
  );
}
