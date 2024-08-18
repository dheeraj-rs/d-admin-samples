'use client';
import React, { useState } from 'react';
import Icon from '@/hooks/Icon';
import { iconData } from '@/hooks/iconData';
import IconCustomizeModal from './IconCustomizeModal';

const IconsDemo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  const icons = iconData.icons || iconData;
  const filteredIcons = icons.filter((icon) =>
    (icon.properties?.name || icon.name)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    setIsCustomizeOpen(true);
  };

  const handleCustomizedClose = () => {
    setIsCustomizeOpen(false);
    setSelectedIcon(null);
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative"
      style={{ position: 'relative' }}
    >
      <h1 className="text-4xl font-bold text-center mb-4">Gradienticons</h1>
      <p className="text-xl text-center mb-8">
        Beautiful Gradient Icons for React
      </p>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Icon Gallery</h2>
        <input
          type="text"
          placeholder="Search icons..."
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredIcons.map((icon) => {
            const name = icon.properties?.name || icon.name;
            return (
              <div
                key={name}
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300 relative cursor-pointer"
                onClick={() => handleIconClick(icon)}
              >
                <Icon
                  name={name}
                  {...{
                    size: 32,
                    color: 'currentColor',
                  }}
                />
                <span className="mt-2 text-sm text-gray-600">{name}</span>
              </div>
            );
          })}
        </div>
      </section>
      {selectedIcon && (
        <IconCustomizeModal
          isOpen={isCustomizeOpen}
          onClose={handleCustomizedClose}
          selectedIcon={selectedIcon}
          initialProps={{ size: 32, color: 'currentColor' }}
        />
      )}
    </div>
  );
};

export default IconsDemo;
