import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';

const IconCustomizer = ({ isOpen, onClose, initialPreset, onApply }) => {
  const [iconProps, setIconProps] = useState(initialPreset);
  const [activeColorPicker, setActiveColorPicker] = useState(null);

  useEffect(() => {
    setIconProps(initialPreset);
  }, [initialPreset]);

  const handleChange = (prop, value) => {
    setIconProps((prev) => {
      if (prop === 'gradientColors' || prop === 'hoverGradientColors') {
        return { ...prev, [prop]: value };
      } else if (prop.includes('[')) {
        const [arrayProp, index] = prop.split('[');
        const updatedArray = [...(prev[arrayProp] || [])];
        updatedArray[parseInt(index)] = value.hex;
        return { ...prev, [arrayProp]: updatedArray };
      }
      return { ...prev, [prop]: value.hex };
    });
  };

  const renderColorPicker = (prop) => {
    const isGradient =
      prop === 'gradientColors' || prop === 'hoverGradientColors';
    let colors = isGradient
      ? iconProps[prop] || ['#ffffff', '#000000']
      : [iconProps[prop] || '#000000'];

    if (!Array.isArray(colors)) {
      colors = [colors];
    }

    return (
      <div className="relative">
        <div className="flex space-x-2">
          {colors.map((color, index) => (
            <button
              key={index}
              className="w-8 h-8 rounded-md border border-gray-300 shadow-sm transition-shadow duration-200 hover:shadow-md"
              style={{
                backgroundColor: color,
                backgroundImage:
                  isGradient && colors.length > 1
                    ? `linear-gradient(to right, ${colors[0]}, ${colors[1]})`
                    : 'none',
              }}
              onClick={() =>
                setActiveColorPicker(
                  activeColorPicker === `${prop}[${index}]`
                    ? null
                    : `${prop}[${index}]`
                )
              }
            />
          ))}
        </div>
        {activeColorPicker && activeColorPicker.startsWith(prop) && (
          <div className="absolute z-10 mt-2">
            <SketchPicker
              color={colors[activeColorPicker.endsWith('[1]') ? 1 : 0]}
              onChange={(color) => handleChange(activeColorPicker, color)}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out overflow-y-auto`}
      style={{ zIndex: '999' }}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Customize Icon</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Size
            </label>
            <input
              type="range"
              min="16"
              max="128"
              value={parseInt(iconProps.size) || 32}
              onChange={(e) =>
                handleChange('size', { hex: `${e.target.value}px` })
              }
              className="w-full"
            />
            <span className="text-sm text-gray-500">{iconProps.size}</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Color
            </label>
            {renderColorPicker('color')}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gradient Colors
            </label>
            {renderColorPicker('gradientColors')}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hover Color
            </label>
            {renderColorPicker('hoverColor')}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hover Gradient Colors
            </label>
            {renderColorPicker('hoverGradientColors')}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Direction
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={iconProps.directionStart || 'top'}
                onChange={(e) =>
                  handleChange('directionStart', { hex: e.target.value })
                }
                className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                {[
                  'top',
                  'bottom',
                  'left',
                  'right',
                  'topLeft',
                  'topRight',
                  'bottomLeft',
                  'bottomRight',
                ].map((dir) => (
                  <option key={dir} value={dir}>
                    {dir}
                  </option>
                ))}
              </select>
              <select
                value={iconProps.directionEnd || 'bottom'}
                onChange={(e) =>
                  handleChange('directionEnd', { hex: e.target.value })
                }
                className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                {[
                  'top',
                  'bottom',
                  'left',
                  'right',
                  'topLeft',
                  'topRight',
                  'bottomLeft',
                  'bottomRight',
                ].map((dir) => (
                  <option key={dir} value={dir}>
                    {dir}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Opacity
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={iconProps.opacity || 1}
              onChange={(e) =>
                handleChange('opacity', { hex: parseFloat(e.target.value) })
              }
              className="w-full"
            />
            <span className="text-sm text-gray-500">{iconProps.opacity}</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Background Color
            </label>
            {renderColorPicker('backgroundColor')}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Shape
            </label>
            <select
              value={iconProps.shape || 'circle'}
              onChange={(e) => handleChange('shape', { hex: e.target.value })}
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="circle">Circle</option>
              <option value="square">Square</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Border Radius
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={iconProps.borderRadius || 0}
              onChange={(e) =>
                handleChange('borderRadius', { hex: parseInt(e.target.value) })
              }
              className="w-full"
            />
            <span className="text-sm text-gray-500">
              {iconProps.borderRadius || 0}px
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Padding
            </label>
            <input
              type="range"
              min="0"
              max="20"
              value={iconProps.padding || 0}
              onChange={(e) =>
                handleChange('padding', { hex: parseInt(e.target.value) })
              }
              className="w-full"
            />
            <span className="text-sm text-gray-500">
              {iconProps.padding || 0}px
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Outer Padding
            </label>
            <input
              type="range"
              min="0"
              max="20"
              value={iconProps.outerPadding || 0}
              onChange={(e) =>
                handleChange('outerPadding', { hex: parseInt(e.target.value) })
              }
              className="w-full"
            />
            <span className="text-sm text-gray-500">
              {iconProps.outerPadding || 0}px
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Box Shadow
            </label>
            <select
              value={iconProps.boxShadow || ''}
              onChange={(e) =>
                handleChange('boxShadow', { hex: e.target.value })
              }
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">None</option>
              <option value="0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)">
                Light
              </option>
              <option value="0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)">
                Medium
              </option>
              <option value="0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)">
                Heavy
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Icon Shadow
            </label>
            <select
              value={iconProps.iconShadow || ''}
              onChange={(e) =>
                handleChange('iconShadow', { hex: e.target.value })
              }
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">None</option>
              <option value="0 1px 3px rgba(0,0,0,0.12)">Light</option>
              <option value="0 3px 6px rgba(0,0,0,0.16)">Medium</option>
              <option value="0 10px 20px rgba(0,0,0,0.19)">Heavy</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cursor
            </label>
            <select
              value={iconProps.cursor || 'default'}
              onChange={(e) => handleChange('cursor', { hex: e.target.value })}
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="default">Default</option>
              <option value="pointer">Pointer</option>
              <option value="help">Help</option>
              <option value="not-allowed">Not Allowed</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => onApply(iconProps)}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default IconCustomizer;
