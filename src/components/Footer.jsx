export default function Footer() {
  return (
    <footer className="bg-gradient-to-br  via-white pt-16 rounded-t-3xl shadow-2xl border-t-4 border-gradient-to-r from-[#fc00ff]/30 to-[#00dbde]/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Slogan luxury */}
        <div className="text-center mb-10">
          <span className="font-serif text-2xl md:text-3xl font-bold bg-gradient-to-br from-[#fc00ff] to-[#00dbde] bg-clip-text text-transparent drop-shadow-lg tracking-widest">
            Desires Jewelry - Timeless Luxury
          </span>
          <div className="mt-2 text-gray-500 italic text-sm md:text-base font-light">
            "Elegance is the only beauty that never fades."
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12">
          {/* CUSTOMER CARE */}
          <div>
            <h3 className="font-serif font-bold text-lg md:text-xl mb-5 tracking-wide text-gray-900">CUSTOMER CARE</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:underline hover:text-[#fc00ff] transition">Contact Us</a></li>
              <li><a href="#" className="hover:underline hover:text-[#fc00ff] transition">Call: +84 886 460 385</a></li>
              <li><a href="#" className="hover:underline hover:text-[#fc00ff] transition">FAQ</a></li>
              <li><a href="#" className="hover:underline hover:text-[#fc00ff] transition">Track Your Order</a></li>
              <li><a href="#" className="hover:underline hover:text-[#fc00ff] transition">Book Appointment</a></li>
              <li><a href="#" className="hover:underline hover:text-[#fc00ff] transition">Accessibility</a></li>
              <li><a href="#" className="hover:underline hover:text-[#fc00ff] transition">Sitemap</a></li>
            </ul>
          </div>
          {/* OUR COMPANY */}
          <div>
            <h3 className="font-serif font-bold text-lg md:text-xl mb-5 tracking-wide text-gray-900">OUR COMPANY</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:underline hover:text-[#fc00ff] transition">Find a Boutique ↗</a></li>
              <li><a href="#" className="hover:underline hover:text-[#fc00ff] transition">Careers ↗</a></li>
              <li><a href="#" className="hover:underline hover:text-[#fc00ff] transition">Corporate Social Responsibility</a></li>
              <li><a href="#" className="hover:underline hover:text-[#fc00ff] transition">Credits</a></li>
            </ul>
          </div>
          {/* LEGAL AREA */}
          <div>
            <h3 className="font-serif font-bold text-lg md:text-xl mb-5 tracking-wide text-gray-900">LEGAL AREA</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:underline hover:text-[#fc00ff] transition">Terms of Use</a></li>
              <li><a href="#" className="hover:underline hover:text-[#fc00ff] transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline hover:text-[#fc00ff] transition">Conditions of Sale</a></li>
              <li><a href="#" className="hover:underline hover:text-[#fc00ff] transition">Accessibility Statement</a></li>
              <li><a href="#" className="hover:underline hover:text-[#fc00ff] transition">California Privacy Rights</a></li>
              <li><a href="#" className="hover:underline hover:text-[#fc00ff] transition">Human Rights Statement ↗</a></li>
              <li><a href="#" className="hover:underline hover:text-[#fc00ff] transition">Do Not Sell or Share My Info</a></li>
            </ul>
          </div>
          {/* FOLLOW US */}
          <div>
            <h3 className="font-serif font-bold text-lg md:text-xl mb-5 tracking-wide text-gray-900">FOLLOW US</h3>
            <div className="flex space-x-4 mb-6">
              {/* Social icons luxury */}
              <a href="#" aria-label="Instagram" className="rounded-full bg-gradient-to-br from-[#fc00ff] to-[#00dbde] p-2 shadow-lg hover:scale-110 hover:shadow-pink-200/60 transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17" cy="7" r="1.5" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="rounded-full bg-gradient-to-br from-[#fc00ff] to-[#00dbde] p-2 shadow-lg hover:scale-110 hover:shadow-blue-200/60 transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 2.1v3.2h-1.9c-.2 0-.6.2-.6.7v1.7h2.5l-.3 2.6h-2.2V22h-3.1V10.3H8.1V7.7h2.1V6c0-2.1 1.3-3.2 3.2-3.2.9 0 1.7.1 1.7.1z"/>
                </svg>
              </a>
              <a href="#" aria-label="X" className="rounded-full bg-gradient-to-br from-[#fc00ff] to-[#00dbde] p-2 shadow-lg hover:scale-110 hover:shadow-gray-200/60 transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 4l16 16M20 4L4 20" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="rounded-full bg-gradient-to-br from-[#fc00ff] to-[#00dbde] p-2 shadow-lg hover:scale-110 hover:shadow-red-200/60 transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.94C18.2 6 12 6 12 6s-6.2 0-7.86.06a2.75 2.75 0 0 0-1.94 1.94A28.6 28.6 0 0 0 2 12a28.6 28.6 0 0 0 .2 3.999 2.75 2.75 0 0 0 1.94 1.94C5.8 18 12 18 12 18s6.2 0 7.86-.06a2.75 2.75 0 0 0 1.94-1.94A28.6 28.6 0 0 0 22 12a28.6 28.6 0 0 0-.2-3.999zM10 15V9l6 3-6 3z"/>
                </svg>
              </a>
              <a href="#" aria-label="Pinterest" className="rounded-full bg-gradient-to-br from-[#fc00ff] to-[#00dbde] p-2 shadow-lg hover:scale-110 hover:shadow-pink-200/60 transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 3.13 8.09 7.25 8.88-.1-.75-.19-1.91.04-2.73.21-.75 1.36-4.77 1.36-4.77s-.34-.68-.34-1.68c0-1.57.91-2.75 2.05-2.75.97 0 1.44.73 1.44 1.6 0 .98-.62 2.44-.94 3.8-.27 1.13.57 2.05 1.68 2.05 2.02 0 3.38-2.59 3.38-5.66 0-2.34-1.58-4.09-4.45-4.09-3.24 0-5.25 2.43-5.25 5.14 0 .93.36 1.93.81 2.47.09.11.1.21.07.32-.08.35-.26 1.13-.29 1.29-.05.21-.17.26-.39.16-1.45-.67-2.36-2.77-2.36-4.46 0-3.63 2.64-6.97 7.6-6.97 3.98 0 7.08 2.84 7.08 6.62 0 3.96-2.5 7.14-5.97 7.14-1.19 0-2.31-.62-2.69-1.34l-.73 2.78c-.21.8-.62 1.8-.92 2.41.69.21 1.42.32 2.18.32 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
                </svg>
              </a>
            </div>
            {/* Accessibility icons (optional) */}
            <div className="flex space-x-2 justify-center">
              <span className="inline-block bg-black text-white rounded-full px-3 py-1 text-xs font-bold">♿</span>
              <span className="inline-block bg-black text-white rounded-full px-3 py-1 text-xs font-bold">🖥️</span>
            </div>
          </div>
        </div>
        <hr className="my-10 border-t-2 border-gradient-to-r from-[#fc00ff]/30 to-[#00dbde]/30" />
        {/* Logo brand luxury ở giữa mobile */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4">
          <div className="flex-1 flex justify-center md:justify-start gap-8 opacity-80">
            <span className="font-serif text-lg md:text-xl bg-gradient-to-br from-[#fc00ff] to-[#00dbde] bg-clip-text text-transparent font-bold tracking-widest">DESIRES</span>
            <span className="font-serif text-sm">Cartier Women's Initiative</span>
            <span className="font-serif text-sm">Fondation Cartier</span>
            <span className="font-serif text-sm">Philanthropy Cartier</span>
          </div>
        </div>
      </div>
      {/* Bottom bar luxury */}
      <div className="w-full py-4 text-white text-center font-medium bg-gradient-to-br from-[#fc00ff] to-[#00dbde] mt-4 rounded-b-2xl shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4">
          <div>
            SHOP IN: UNITED STATES
            <a href="#" className="underline underline-offset-4 ml-2 hover:text-white/80">Change Country</a>
          </div>
          <div className="mt-2 md:mt-0 text-xs md:text-sm font-light tracking-wide">
            COPYRIGHT © {new Date().getFullYear()} DESIRES. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}