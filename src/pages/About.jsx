import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import { useIntersectionObserver } from "@uidotdev/usehooks";

export default function About() {
  const [heroRef, heroEntry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  const [aboutRef, aboutEntry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  const [coreValuesRef, coreValuesEntry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  const [luxuryServicesRef, luxuryServicesEntry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  const [brandImageRef, brandImageEntry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 mt-[56px]">
      {/* Hero Banner */}
      <div
        ref={heroRef}
        className={`relative w-full h-[260px] md:h-[360px] rounded-2xl overflow-hidden mb-12 shadow-xl
          ${heroEntry?.isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >
        {heroEntry?.isIntersecting && (
          <>
            <img
              src="https://media.istockphoto.com/id/1293029276/vi/anh/ch%C3%A2n-dung-ng%C6%B0%E1%BB%9Di-ph%E1%BB%A5-n%E1%BB%AF-xinh-%C4%91%E1%BA%B9p-v%E1%BB%9Bi-%C4%91%E1%BB%93-trang-s%E1%BB%A9c.jpg?s=612x612&w=0&k=20&c=pElQkn_GUU05N9sif1Hzapf5m3n3I_68jsgn8KQYavg="
              alt="Luxury Jewelry Brand"
              className="absolute inset-0 w-full h-full object-cover object-center scale-100 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-[#fc00ff]/40" />
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
              <h1 className="font-serif text-4xl md:text-5xl font-bold  drop-shadow-lg mb-4 tracking-wide animate-gradient-x bg-gradient-to-br from-[#fc00ff] via-white to-[#00dbde] bg-clip-text text-transparent">
                About Desires
              </h1>
              <p className="text-lg md:text-2xl text-white/90 font-light drop-shadow-md max-w-2xl animate-fade-in-up delay-200">
                Where Timeless Elegance Meets Modern Luxury
              </p>
            </div>
          </>
        )}
      </div>

      {/* About Us Section */}
      <section
        ref={aboutRef}
        className={`mb-12 text-center animate-fade-in-up duration-700 delay-100
          ${aboutEntry?.isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-br from-[#fc00ff] to-[#00dbde] bg-clip-text text-transparent animate-gradient-x">
          Our Story
        </h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-light">
          Founded with a passion for timeless beauty and exquisite
          craftsmanship,{" "}
          <span className="font-semibold text-[#fc00ff]">Desires</span>{" "}
          redefines luxury jewelry for the modern era. Each piece is a
          celebration of artistry, innovation, and the enduring allure of
          precious materials. Our collections are designed to inspire, empower,
          and become cherished heirlooms for generations to come.
        </p>
      </section>

      {/* Core Values Section */}
      <section
        ref={coreValuesRef}
        className={`mb-12 animate-fade-in-up duration-700 delay-200
          ${coreValuesEntry?.isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-center mb-8 animate-gradient-x bg-gradient-to-br from-[#fc00ff] to-[#00dbde] bg-clip-text text-transparent">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center p-6 bg-gradient-to-br from-[#fc00ff]/10 to-[#00dbde]/10 rounded-xl shadow-md transition-transform duration-500 hover:scale-105 group">
            <DiamondOutlinedIcon className="text-4xl text-[#fc00ff] mb-2 group-hover:animate-bounce" />
            <span className="font-semibold text-lg mb-1">
              Exquisite Craftsmanship
            </span>
            <span className="text-gray-600 text-center">
              Every detail is meticulously perfected by master artisans.
            </span>
          </div>
          <div className="flex flex-col items-center p-6 bg-gradient-to-br from-[#fc00ff]/10 to-[#00dbde]/10 rounded-xl shadow-md transition-transform duration-500 hover:scale-105 group">
            <EmojiEventsOutlinedIcon className="text-4xl text-[#fc00ff] mb-2 group-hover:animate-bounce" />
            <span className="font-semibold text-lg mb-1">Timeless Design</span>
            <span className="text-gray-600 text-center">
              Blending classic elegance with contemporary flair.
            </span>
          </div>
          <div className="flex flex-col items-center p-6 bg-gradient-to-br from-[#fc00ff]/10 to-[#00dbde]/10 rounded-xl shadow-md transition-transform duration-500 hover:scale-105 group">
            <LocalOfferOutlinedIcon className="text-4xl text-[#fc00ff] mb-2 group-hover:animate-bounce" />
            <span className="font-semibold text-lg mb-1">Ethical Sourcing</span>
            <span className="text-gray-600 text-center">
              Responsibly sourced gems and materials, always.
            </span>
          </div>
          <div className="flex flex-col items-center p-6 bg-gradient-to-br from-[#fc00ff]/10 to-[#00dbde]/10 rounded-xl shadow-md transition-transform duration-500 hover:scale-105 group">
            <WhatshotOutlinedIcon className="text-4xl text-[#fc00ff] mb-2 group-hover:animate-bounce" />
            <span className="font-semibold text-lg mb-1">
              Passion & Innovation
            </span>
            <span className="text-gray-600 text-center">
              Driven by creativity, inspired by your desires.
            </span>
          </div>
        </div>
      </section>

      {/* Luxury Services Section */}
        <section
        ref={luxuryServicesRef}
        className={`mb-12 animate-fade-in-up duration-700 delay-300
          ${luxuryServicesEntry?.isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-center mb-8 animate-gradient-x bg-gradient-to-br from-[#fc00ff] to-[#00dbde] bg-clip-text text-transparent">
          Luxury Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg border border-[#fc00ff]/20 transition-transform duration-500 hover:scale-105 group">
            <img
              src="https://media.istockphoto.com/id/1049019166/vi/vec-to/th%E1%BA%BB-qu%C3%A0-t%E1%BA%B7ng-c%C3%B3-n%C6%A1.jpg?s=612x612&w=0&k=20&c=WXaYDMM34TBIHzA07NdwNnJ-MFbozkw2P-PSjSF_6fs="
              alt="Gift Wrapping"
              className="w-14 h-14 mb-3 group-hover:animate-pulse"
            />
            <span className="font-semibold text-lg mb-1">
              Complimentary Gift Wrapping
            </span>
            <span className="text-gray-600 text-center">
              Every order arrives beautifully wrapped, ready to delight.
            </span>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg border border-[#fc00ff]/20 transition-transform duration-500 hover:scale-105 group">
            <img
              src="https://media.istockphoto.com/id/849921508/vi/vec-to/kh%C3%A1i-ni%E1%BB%87m-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-chuy%E1%BB%83n-ph%C3%A1t-nhanh-xe-t%E1%BA%A3i-v%E1%BB%9Bi-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-%C4%91%E1%BB%93ng-h%E1%BB%93-d%E1%BB%ABng-cho-d%E1%BB%8Bch-v%E1%BB%A5-%C4%91%E1%BA%B7t.jpg?s=612x612&w=0&k=20&c=f1hUIl59bJFv4pXT5y4h4mHANB0-vaeGTnt720lenRk="
              alt="Delivery"
              className="w-14 h-14 mb-3 group-hover:animate-pulse"
            />
            <span className="font-semibold text-lg mb-1">
              Worldwide Delivery
            </span>
            <span className="text-gray-600 text-center">
              Fast, secure, and insured shipping to your doorstep.
            </span>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg border border-[#fc00ff]/20 transition-transform duration-500 hover:scale-105 group">
            <img
              src="https://media.istockphoto.com/id/2163738562/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-ph%C3%A1c-th%E1%BA%A3o-m%E1%BB%8Fng-hai-tay-c%E1%BA%A7m-ho%E1%BA%B7c-%C3%B4m-nh%C3%B3m-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-ng%C6%B0%E1%BB%9Di-ho%E1%BA%B7c-d%E1%BA%A5u-hi%E1%BB%87u-d%C3%B2ng-gia.jpg?s=612x612&w=0&k=20&c=mNB3Sz5dmGu4n3pruYa_v-Om6YTfYk8oR-v29HPo1cU="
              alt="Support"
              className="w-14 h-14 mb-3 group-hover:animate-pulse"
            />
            <span className="font-semibold text-lg mb-1">
              Personalized Support
            </span>
            <span className="text-gray-600 text-center">
              Our experts are here to assist you at every step.
            </span>
          </div>
        </div>
      </section>

      {/* Brand Image Section */}
      <section
        ref={brandImageRef}
        className={`mb-8 flex flex-col md:flex-row items-center gap-8 animate-fade-in-up duration-700 delay-400
          ${brandImageEntry?.isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >
        <div className="w-full md:w-1/2 rounded-2xl shadow-xl overflow-hidden min-h-[260px] md:min-h-[360px]">
          <img
            src="https://media.istockphoto.com/id/1466744915/vi/anh/th%E1%BB%A3-kim-ho%C3%A0n-chuy%C3%AAn-nghi%E1%BB%87p-l%C3%A0m-vi%E1%BB%87c-v%E1%BB%9Bi-%C4%91%C3%A1-qu%C3%BD-t%E1%BA%A1i-b%C3%A0n-ch%E1%BB%A5p-c%E1%BA%ADn-c%E1%BA%A3nh.jpg?s=612x612&w=0&k=20&c=lN7ch_cYiTdffxG37TPk6k1078IukcC0VdM-SP4iAA4="
            alt="Brand Craftsmanship"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            style={{ display: "block" }}
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-serif text-2xl font-bold mb-2 bg-gradient-to-br from-[#fc00ff] to-[#00dbde] bg-clip-text text-transparent animate-gradient-x">
            Crafted for You
          </h3>
          <p className="text-lg text-gray-700 font-light">
            At <span className="font-semibold text-[#fc00ff]">Desires</span>,
            every piece is a promise of quality, beauty, and meaning. Discover
            the art of fine jewelry, reimagined for today's world.
          </p>
        </div>
      </section>
    </div>
  );
}
