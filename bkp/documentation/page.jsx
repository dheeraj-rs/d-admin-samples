'use client';
import React, { useState, useCallback } from 'react';
import Icon from '@/hooks/Icon';
import { iconData } from '@/hooks/iconData';
import IconCustomizer from './IconCustomizer';

const presets = [
  { name: 'Default', props: { size: 32, color: 'currentColor' } },
  {
    name: 'Gradient',
    props: { size: 32, gradientColors: ['#ff00ff', '#00ffff'] },
  },
  {
    name: 'Shadowed',
    props: {
      size: 40,
      padding: 8,
      color: '#4A90E2',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
  },
  {
    name: 'Hover Effect',
    props: { size: 32, color: '#4A90E2', hoverColor: '#2E5A9C' },
  },
];

const Documentation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedIcon, setCopiedIcon] = useState(null);
  const [currentPreset, setCurrentPreset] = useState(presets[0]);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [customIconProps, setCustomIconProps] = useState(null);

  const icons = iconData.icons || iconData;
  const filteredIcons = icons.filter((icon) =>
    (icon.properties?.name || icon.name)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const copyToClipboard = useCallback(
    (iconName) => {
      const propsToUse = customIconProps || currentPreset.props;
      const propsString = Object.entries(propsToUse)
        .map(([key, value]) => {
          if (typeof value === 'string') {
            return `${key}="${value}"`;
          } else if (Array.isArray(value)) {
            return `${key}={${JSON.stringify(value)}}`;
          }
          return `${key}={${value}}`;
        })
        .join(' ');
      const codeToWrite = `<Icon name="${iconName}" ${propsString} />`;
      navigator.clipboard.writeText(codeToWrite);
      setCopiedIcon(iconName);
      setTimeout(() => setCopiedIcon(null), 2000);
    },
    [currentPreset, customIconProps]
  );

  const handlePresetClick = (preset) => {
    setCurrentPreset(preset);
    setCustomIconProps(null);
  };

  const handleCustomizerOpen = () => {
    setIsCustomizerOpen(true);
  };

  const handleCustomizerClose = () => {
    setIsCustomizerOpen(false);
  };

  const handleCustomizerApply = (newProps) => {
    setCustomIconProps(newProps);
    setIsCustomizerOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">Gradienticons</h1>
      <p className="text-xl text-center mb-8">
        Beautiful Gradient Icons for React
      </p>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Icon Gallery</h2>
        <div className="flex flex-wrap gap-2 mb-4 items-center">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handlePresetClick(preset)}
              className={`px-3 py-1 rounded ${
                currentPreset.name === preset.name && !customIconProps
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {preset.name}
            </button>
          ))}
          <button
            onClick={handleCustomizerOpen}
            className={`px-3 py-1 rounded ml-auto ${
              customIconProps
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            Custom
          </button>
        </div>
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
                onClick={() => copyToClipboard(name)}
              >
                <div className="relative">
                  <Icon
                    name={name}
                    {...(customIconProps || currentPreset.props)}
                  />
                  {copiedIcon === name && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black bg-opacity-75 text-white text-xs rounded px-2 py-1 animate-bounce">
                        Copied!
                      </div>
                    </div>
                  )}
                </div>
                <span className="mt-2 text-sm text-gray-600">{name}</span>
              </div>
            );
          })}
        </div>
      </section>
      <IconCustomizer
        isOpen={isCustomizerOpen}
        onClose={handleCustomizerClose}
        initialPreset={customIconProps || currentPreset.props}
        onApply={handleCustomizerApply}
      />
    </div>
  );
};

export default Documentation;
