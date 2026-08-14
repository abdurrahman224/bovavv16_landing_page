import React from 'react';

import logo from '/Image/logos.png'

const Header = () => {
  return (
    <header className="  container mx-auto px-4 pb-6 animate-fade-in-down">
      {/* Left: Logo sdfsd*/}
      <div className="flex-1 flex gap-4 sm:gap-8  justify-start items-center py-2 sm:py-0">
        <div className="transition-smooth hover-scale py-4 sm:py-6">
          <img
            src={logo}
            alt="logo"
            className="w-auto h-6 sm:h-10  lg:h-14 object-contain"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;