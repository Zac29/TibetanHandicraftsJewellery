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
      {/* ===== ABOUT SECTION ===== */}
<section className="w-full bg-white overflow-hidden">

  {/* ================= DESKTOP (FIGMA EXACT) ================= */}
  <div className="hidden xl:block relative h-[1050px]">
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

      {/* Top Image */}
      <div className="absolute left-[704px] top-[140px] w-[577px] h-[181px] rounded-[22px] overflow-hidden">
        <Image src="/Bowl.png" alt="" fill className="object-cover" />
      </div>

      {/* Subtract Image */}
      <div className="absolute left-[704px] top-[360px] w-[577px] h-[352px] overflow-hidden figma-subtract">
        <Image src="/decore.png" alt="" fill className="object-cover" />
      </div>

      {/* Bottom Image */}
      <div className="absolute left-[600px] top-[550px] w-[400px] h-[300px] rounded-[22px] overflow-hidden">
        <Image src="/Bowl.png" alt="" fill className="object-cover" />
      </div>

      {/* 50M Card */}
      <div className="absolute left-[876px] top-[720px] w-[151px] h-[121px] bg-[#309EC4] rounded-[16px] shadow-[6px_4px_10px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center">
        <span className="text-white text-[50px] leading-[60px] font-medium">
          50M+
        </span>
        <span className="text-white text-[36px] leading-[40px] font-medium">
          Sold
        </span>
      </div>
    </div>
  </div>

  {/* ================= MOBILE & TABLET ================= */}
  <div className="xl:hidden px-6 md:px-16 py-20 max-w-6xl mx-auto">

    <h2 className="text-4xl md:text-5xl font-extrabold tracking-[4px] text-[#10111A] mb-6">
      ABOUT US
    </h2>

    <p className="text-[17px] leading-[28px] text-[#97918B] mb-10">
      From they fine john he give of rich he. They age and draw mrs like.
      Improving end distrusts may instantly was household applauded
      incommode. Why kept very ever home mrs Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo maxime, repellendus dolor sunt sed ipsa unde architecto dicta magni reprehenderit ut, voluptatibus veniam eveniet harum tempore fuga! Sit, ullam necessitatibus.
    </p>

    <Link
      href="/products"
      className="inline-flex w-[220px] h-[60px] bg-[#309EC4] rounded-[10px] items-center justify-center text-white font-bold tracking-wider uppercase mb-14"
    >
      Explore More
    </Link>

    {/* Image Stack */}
    <div className="grid gap-6">
      <div className="relative h-[220px] rounded-[20px] overflow-hidden">
        <Image src="/Bowl.png" alt="" fill className="object-cover" />
      </div>

      <div className="relative h-[260px] rounded-[20px] overflow-hidden">
        <Image src="/decore.png" alt="" fill className="object-cover" />
      </div>

      <div className="relative h-[220px] rounded-[20px] overflow-hidden">
        <Image src="/Bowl.png" alt="" fill className="object-cover" />
      </div>

      <div className="bg-[#309EC4] rounded-[16px] p-8 text-white text-center shadow-lg">
        <div className="text-4xl font-semibold">50M+</div>
        <div className="text-2xl">Sold</div>
      </div>
    </div>
  </div>

</section>

    </>
  );
}
