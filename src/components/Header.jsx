// Header.jsx
import React from 'react';

function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold md:text-2xl">苏州河旅游</h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><a href="#spots" className="hover:text-blue-200">景点</a></li>
              <li><a href="#map" className="hover:text-blue-200">地图</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;