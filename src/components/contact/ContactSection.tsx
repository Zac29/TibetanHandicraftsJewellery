"use client";

import { Phone, Mail, Printer, ChevronDown, MapPin } from "lucide-react";
import { Cormorant_Garamond, Jost } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["600"] });
const jost = Jost({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function ContactSection() {
  return (
    <section className={`w-full bg-[#fcfaf7] py-12 lg:py-24 ${jost.className}`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        
        {/* THE MAIN CARD - Responsive Grid instead of Absolute Pixels */}
        <div className="relative bg-white shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-stone-100 flex flex-col lg:flex-row overflow-hidden">
          
          {/* LEFT CONTENT: THE FORM (60% width on Desktop) */}
          <div className="w-full lg:w-[60%] p-8 md:p-16 lg:p-24 space-y-12">
            <header className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.5em] text-amber-700 font-bold">
                Inquiry
              </span>
              <h2 className={`${cormorant.className} text-4xl md:text-5xl lg:text-6xl text-stone-900 leading-tight`}>
                Get in <span className="italic font-light text-stone-500">Touch</span>
              </h2>
              <p className="text-stone-400 text-sm max-w-md leading-relaxed">
                Connect with our studio for bespoke commissions, product inquiries, or traditional craft consultations.
              </p>
            </header>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <input 
                  type="text" 
                  placeholder="Your Name *" 
                  className="w-full border-b border-stone-200 py-4 text-sm outline-none focus:border-amber-700 transition-colors bg-transparent"
                />
              </div>
              <div className="space-y-1">
                <input 
                  type="email" 
                  placeholder="Email Address *" 
                  className="w-full border-b border-stone-200 py-4 text-sm outline-none focus:border-amber-700 transition-colors bg-transparent"
                />
              </div>
              <div className="md:col-span-2 relative">
                <select 
                  className="w-full border-b border-stone-200 py-4 text-sm outline-none focus:border-amber-700 transition-colors bg-transparent appearance-none cursor-pointer"
                >
                  <option value="" disabled selected>Nature of Inquiry</option>
                  <option value="jewellery">Tibetan Jewellery</option>
                  <option value="handicrafts">Traditional Handicrafts</option>
                  <option value="wholesale">Wholesale & Archive</option>
                </select>
                <ChevronDown size={14} className="absolute right-0 top-5 text-stone-400 pointer-events-none" />
              </div>
              <div className="md:col-span-2">
                <textarea 
                  placeholder="How can we assist you?" 
                  rows={4}
                  className="w-full border-b border-stone-200 py-4 text-sm outline-none focus:border-amber-700 transition-colors bg-transparent resize-none"
                />
              </div>

              <button 
                type="submit"
                className="md:col-span-2 mt-6 h-[60px] bg-stone-900 text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-amber-800 transition-all duration-500"
              >
                Send Inquiry
              </button>
            </form>

            {/* CONTACT QUICK LINKS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8">
              <ContactItem icon={<Phone size={18}/>} label="Phone" value="+91 98765 43210" />
              <ContactItem icon={<Mail size={18}/>} label="Email" value="studio@tibetanarts.com" />
              <ContactItem icon={<MapPin size={18}/>} label="Studio" value="Bodh Gaya, India" />
            </div>
          </div>

          {/* RIGHT CONTENT: THE VISUAL (40% width on Desktop) */}
<div className="w-full lg:w-[40%] h-[300px] md:h-[450px] lg:h-auto relative bg-stone-100">
  {/* The Amber-Gold accent bar */}
  <div className="absolute top-0 right-0 w-2 h-full bg-amber-700 z-10 hidden lg:block" />
  
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14457.777478696808!2d84.98184515!3d24.69510165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f32c3f30960557%3A0x6e949829f03a6285!2sBodh%20Gaya%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
    className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-1000"
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="space-y-2 group">
      <div className="text-amber-700 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">{label}</p>
      <p className="text-stone-800 text-[13px] font-medium break-words">{value}</p>
    </div>
  );
}