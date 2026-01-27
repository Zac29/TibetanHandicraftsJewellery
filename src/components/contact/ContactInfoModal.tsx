"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { X, Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"] });

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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop with Kinetic Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="
              relative w-full max-w-[440px]
              bg-[#fcfaf7] 
              border border-stone-200
              shadow-[0_50px_100px_rgba(0,0,0,0.1)]
              p-10 md:p-12
              overflow-hidden
            "
          >
            {/* Close Icon */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-stone-400 hover:text-amber-700 transition-colors"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            {/* Logo / Header */}
            <div className="flex flex-col items-center mb-10">
              <div className="mb-6 opacity-80">
                <Image
                  src="/logo.png"
                  alt="Shop Logo"
                  width={100}
                  height={50}
                  className="object-contain"
                />
              </div>
              <h2 className={`${cormorant.className} text-3xl text-stone-900 text-center leading-tight`}>
                Concierge <br /> <span className="italic font-light text-stone-500 text-xl tracking-normal">Inquiry Service</span>
              </h2>
            </div>

            {/* Contact Details (Minimalist List) */}
            <div className="space-y-6 mb-10">
              <ContactLink 
                icon={<Phone size={16} />} 
                label="Direct Line" 
                value="+91 99999 99999" 
                href="tel:+919999999999"
              />
              <ContactLink 
                icon={<MessageCircle size={16} />} 
                label="WhatsApp" 
                value="Chat with a Master" 
                href="https://wa.me/919999999999"
              />
              <ContactLink 
                icon={<Mail size={16} />} 
                label="Email" 
                value="studio@tibetanarts.com" 
                href="mailto:shop@email.com"
              />
              <div className="flex items-start gap-4 pt-1">
                <div className="text-amber-700 mt-0.5"><MapPin size={16} /></div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-1">Location</p>
                  <p className="text-stone-800 text-[13px]">Bodh Gaya, Bihar, India</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons (Solid Kinetic Style) */}
            <div className="flex flex-col gap-4">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                className="
                  h-[56px] flex items-center justify-center
                  bg-stone-900 text-white
                  text-[11px] font-bold uppercase tracking-[0.3em]
                  hover:bg-amber-800 transition-all duration-500
                "
              >
                Instant WhatsApp
              </a>

              <Link
                href="/contact"
                onClick={onClose}
                className="
                  h-[56px] flex items-center justify-center
                  border border-stone-200 text-stone-600
                  text-[11px] font-bold uppercase tracking-[0.3em]
                  hover:border-stone-900 hover:text-stone-900 transition-all
                "
              >
                Detailed Inquiry
              </Link>
            </div>
            
            {/* Decorative Gold Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-700/20" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ContactLink({ icon, label, value, href }: { icon: any, label: string, value: string, href: string }) {
  return (
    <a href={href} className="flex items-start gap-4 group">
      <div className="text-amber-700 mt-0.5 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-0.5">{label}</p>
        <p className="text-stone-800 text-[13px] group-hover:text-amber-800 transition-colors font-medium underline underline-offset-4 decoration-stone-200">{value}</p>
      </div>
    </a>
  );
}