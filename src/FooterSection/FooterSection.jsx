// import { BsTwitterX } from 'react-icons/bs';
// import { GrLinkedin } from 'react-icons/gr';
// import { LuInstagram } from 'react-icons/lu';
// import { MdOutlineFacebook } from 'react-icons/md';

// const FooterSection = () => {
//   return (
//     <div className="bg-[#111111] text-white flex flex-col font-sans">
//       {/* Footer Area */}
//       <footer className="container px-4 pb-6 sm:pb-8">
//         {/* Bottom Line and Socials */}
//         <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 my-10 sm:my-12 md:my-16 animate-fade-in-up">
//           <p className="text-gray-100 text-base text-center sm:text-left">
//             2025 © All rights reserved.
//           </p>
          

//           <div className="flex gap-2 sm:gap-3 ">
//             {[BsTwitterX,  GrLinkedin,LuInstagram, MdOutlineFacebook ].map((Icon, index) => (
//               <div
//                 key={index}
//                 className="w-12 h-12 sm:w-14 sm:h-14 animate-fade-in-up delay-300 bg-[#1A1A1A] rounded-full flex items-center justify-center border border-gray-800 hover:border-gray-600 hover:bg-[#252525] cursor-pointer transition-all duration-300 hover-scale"
                
//               >
//                 <Icon size={22} className="text-white" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default FooterSection;





import { Phone, Mail, MapPin, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function ArmaFooter() {
  return (
    <div className="bg-black text-white  flex flex-col justify-between section-gap">
      {/* Footer Content */}
      <footer className="relative container mx-auto px-4 w-full ">
        <div className="flex justify-between flex-col sm:flex-row sm:flex-wrap space-y-4 gap-6 lg:gap-12 mb-8 lg:mb-16">
          {/* Logo and Contact - Enhanced */}
          <div className="space-y-3 lg:space-y-6">
            <div className="mb-6 lg:mb-12">
              {/* <h3 className="text-6xl font-black mb-4 tracking-wider bg-gradient-to-r from-red-500 via-white to-red-400 bg-clip-text text-transparent drop-shadow-2xl">
                ARMA
              </h3>
              <div className="w-32 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full mb-4"></div>
              <p className="text-red-400 text-2xl font-bold tracking-[0.3em] uppercase">AGENCY</p> */}

              {/* Logo Image - Enhanced */}
              <div className=" mb-6">
                <img
                  src="/Image/logos.png"
                  alt="ARMA Agency Logo"
                  className="w-46 lg:w-48 h-auto object-contain hover:scale-105 transition-transform duration-300 drop-shadow-2xl filter brightness-110"
                />
              </div>
            </div>

            <div className="space-y-2 lg:space-y-3 mt-4 lg:mt-8">
              <div className="flex items-center gap-2.5 lg:gap-4 group">
                <div className="p-2 rounded-full  transition-colors">
                  <Phone className="text-red-600 " size={20} />
                </div>
                <a
                  href="tel:1300143153"
                  className="text-gray-300 hover:text-white transition-colors text-base lg:text-lg font-medium"
                >
                  1300-143-153
                </a>
              </div>

              <div className="flex items-center gap-2.5 lg:gap-4 group">
                <div className="p-2  rounded-full group-hover:bg-red-500 transition-colors">
                  <Mail className="text-red-600 " size={20} />
                </div>
                <a
                  href="mailto:info@arma.com"
                  className="text-gray-300 hover:text-white transition-colors text-base lg:text-lg font-medium"
                >
                  info@arma.com
                </a>
              </div>

              <div className="flex items-start gap-2.5 lg:gap-4 group">
                <div className="p-2  rounded-full group-hover:bg-red-500 transition-colors">
                  <MapPin
                    className="text-red-600  mt-1 shrink-0"
                    size={20}
                  />
                </div>
                <p className="text-gray-300 text-base lg:text-lg lg:leading-relaxed">
                  600 N Washington Ave
                  <br />
                  Suite C203, Minneapolis,
                  <br />
                  MN 55401
                </p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-3 lg:mb-8 uppercase tracking-wider text-white pb-3">
              Services
            </h4>
            <ul className="space-y-2 lg:space-y-4">
              {[
                'Web Design and Development',
                'Search Engine Optimization',
                'Pay-Per-Click Advertising',
                'Digital marketing',
                'Branding',
                'AI optimisation',
              ].map((service, i) => (
                <li key={i}>
                  <a
                    href="# "
                    className="text-gray-300 hover:text-white transition-colors text-base font-medium flex items-center gap-2 group"
                  >
                    {/* <span className="w-2 h-2 bg-red-600 rounded-full group-hover:bg-red-400 transition-colors"></span> */}
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xl font-bold mb-3 lg:mb-8 uppercase tracking-wider text-white  pb-3">
              Company
            </h4>
            <ul className="space-y-2 lg:space-y-4">
              {['Blog', 'Contact us', 'Book', 'Pricing'].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors text-base font-medium flex items-center gap-2 group"
                  >
                    {/* <span className="w-2 h-2 bg-red-600 rounded-full group-hover:bg-red-400 transition-colors"></span> */}
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Test Website - Enhanced */}
          <div className=" rounded-xl   transition-all duration-300 shadow-xl">
            <div className='bg-[#19191C] px-4 py-6 lg:py-8 rounded-xl'>
              <h4 className="text-xl sm:text-2xl font-bold footer-card-font mb-4 leading-tight">
              Test your website <span className="text-red-500">now</span>
            </h4>
            <p className="text-gray-300 text-base mb-8 leading-relaxed">
              Check your website performance.
            </p>
            <button className="w-full bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Learn More
            </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            © 2026 Arma Agency. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3">
            {[
              { Icon: Twitter, label: 'Whatapp' },
              { Icon: Facebook, label: 'Facebook' },
              { Icon: Instagram, label: 'Instagram' },
              { Icon: Linkedin, label: 'LinkedIn' },
              { Icon: Mail, label: 'Email' },
            ].map((item, index) => (
              <a
                key={index}
                href="#"
                className="w-10 h-10 bg-[#BE301E] rounded-full flex items-center justify-center hover:bg-red-700 transition"
                title={item.label}
              >
                <item.Icon size={18} className="text-white" />
              </a>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition">
              Terms of Use
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}