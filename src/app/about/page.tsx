import PageBanner from "../../components/common/PageBanner";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <PageBanner
        title="About"
        breadcrumb="About"
        imageSrc="/contact-banner.png"
      />

      {/* ===== ABOUT SECTION (FIGMA EXACT) ===== */}
      <section className="relative w-full bg-white h-[1050px] overflow-hidden">
        <div className="max-w-[1440px] mx-auto relative h-full">

          {/* ===== LEFT CONTENT ===== */}
          <div className="absolute left-[208px] top-[140px] w-[484px]">
            <h2 className="text-[52px] leading-[65px] tracking-[5px] font-extrabold text-[#10111A] mb-[28px]">
              ABOUT US
            </h2>

            <p className="text-[18px] leading-[29px] text-[#97918B] mb-[60px]">
              From they fine john he give of rich he. They age and draw mrs like.
              Improving end distrusts may instantly was household applauded
              incommode. Why kept very ever home mrs. Considered sympathize ten
              uncommonly occasional assistance sufficient not.
            </p>

            <Link
              href="/products"
              className="absolute left-0 top-[270px] w-[223px] h-[65px] bg-[#309EC4] rounded-[10px] flex items-center justify-center text-white text-[18px] font-bold tracking-[0.1em] uppercase shadow-[0_20px_40px_rgba(68,68,68,0.15)]"
            >
              Explore More
            </Link>
          </div>

          {/* ===== RIGHT COLLAGE (ABSOLUTE FIGMA POSITIONS) ===== */}

          {/* Top Image */}
          <div className="absolute left-[704px] top-[140px] w-[577px] h-[181px] rounded-[22px] overflow-hidden">
            <Image src="/Bowl.png" alt="" fill className="object-cover" />
          </div>

          {/* Middle Large */}
         <div className="absolute left-[704px] top-[360px] w-[577px] h-[352px] overflow-hidden figma-subtract">
  <Image src="/decore.png" alt="" fill className="object-cover" />
</div>

          {/* Bottom Left Big */}
          <div className="absolute left-[600px] top-[550px] w-[400px] h-[300px] rounded-[22px] overflow-hidden">
            <Image src="/Bowl.png" alt="" fill className="object-cover" />
          </div>

          {/* 50M Card */}
          <div className="absolute left-[876px] top-[720px] w-[181px] h-[141px] bg-[#309EC4] rounded-[16px] shadow-[6px_4px_10px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center">
            <span className="text-white text-[50px] leading-[60px] font-medium">
              50M+
            </span>
            <span className="text-white text-[36px] leading-[40px] font-medium">
              Sold
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
