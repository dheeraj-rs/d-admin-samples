import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import Icon from '@/hooks/Icon';

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

const IconCustomizeModal = ({
  isOpen,
  onClose,
  selectedIcon,
  initialProps,
}) => {
  const [iconProps, setIconProps] = useState(initialProps);
  const [activeColorPicker, setActiveColorPicker] = useState(null);

  useEffect(() => {
    setIconProps(initialProps);
  }, [initialProps]);

  const handleChange = (prop, value) => {
    setIconProps((prev) => {
      if (prop === 'gradientColors' || prop === 'hoverGradientColors') {
        const [arrayProp, index] = prop.split('[');
        const updatedArray = [...(prev[arrayProp] || ['#ffffff', '#000000'])];
        updatedArray[parseInt(index)] =
          value === 'none' ? null : value.hex || value;
        return { ...prev, [arrayProp]: updatedArray };
      } else if (prop.includes('[')) {
        const [arrayProp, index] = prop.split('[');
        const updatedArray = [...(prev[arrayProp] || [])];
        updatedArray[parseInt(index)] =
          value === 'none' ? null : value.hex || value;
        return { ...prev, [arrayProp]: updatedArray };
      }
      return { ...prev, [prop]: value === 'none' ? null : value };
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
                backgroundColor: color || 'transparent',
                backgroundImage:
                  isGradient && colors.length > 1 && colors[0] && colors[1]
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
          <button
            className="w-8 h-8 rounded-md border border-gray-300 shadow-sm transition-shadow duration-200 hover:shadow-md flex items-center justify-center text-gray-500"
            onClick={() =>
              handleChange(isGradient ? `${prop}[0]` : prop, 'none')
            }
          >
            ✕
          </button>
        </div>
        {activeColorPicker && activeColorPicker.startsWith(prop) && (
          <div className="absolute z-10 mt-2">
            <SketchPicker
              color={
                colors[activeColorPicker.endsWith('[1]') ? 1 : 0] || '#000000'
              }
              onChange={(color) => handleChange(activeColorPicker, color)}
              onChangeComplete={(color) => {
                handleChange(activeColorPicker, color);
                setActiveColorPicker(null);
              }}
            />
          </div>
        )}
      </div>
    );
  };

  const copyToClipboard = () => {
    const propsString = Object.entries(iconProps)
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        } else if (Array.isArray(value)) {
          return `${key}={${JSON.stringify(value)}}`;
        }
        return `${key}={${value}}`;
      })
      .join(' ');
    const codeToWrite = `<Icon name="${
      selectedIcon.properties?.name || selectedIcon.name
    }" ${propsString} />`;
    navigator.clipboard.writeText(codeToWrite);
    alert('Icon code copied to clipboard!');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{ zIndex: '999' }}
    >
      <div className="bg-white rounded-lg w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 flex">
          <div className="w-1/3 pr-6 border-r">
            <h3 className="text-xl font-bold mb-4">
              {selectedIcon.properties?.name || selectedIcon.name}
            </h3>
            <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg">
              <Icon
                name={selectedIcon.properties?.name || selectedIcon.name}
                {...iconProps}
              />
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Presets</h4>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setIconProps(preset.props)}
                    className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="w-2/3 pl-6">
            <h3 className="text-xl font-bold mb-4">Customize Icon</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Size
                </label>
                <input
                  type="range"
                  min="16"
                  max="128"
                  value={parseInt(iconProps.size) || 32}
                  onChange={(e) => handleChange('size', `${e.target.value}px`)}
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
                      handleChange('directionStart', e.target.value)
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
                      handleChange('directionEnd', e.target.value)
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
                    handleChange('opacity', parseFloat(e.target.value))
                  }
                  className="w-full"
                />
                <span className="text-sm text-gray-500">
                  {iconProps.opacity}
                </span>
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
                  onChange={(e) => handleChange('shape', e.target.value)}
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
                    handleChange('borderRadius', parseInt(e.target.value))
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
                    handleChange('padding', parseInt(e.target.value))
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
                  max="40"
                  value={iconProps.outerPadding || 0}
                  onChange={(e) =>
                    handleChange('outerPadding', parseInt(e.target.value))
                  }
                  className="w-full"
                />
                <span className="text-sm text-gray-500">
                  {iconProps.outerPadding || 0}px
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stroke Width
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={iconProps.strokeWidth || 0}
                  onChange={(e) =>
                    handleChange('strokeWidth', parseInt(e.target.value, 10))
                  }
                  className="w-full"
                />
                <span className="text-sm text-gray-500">
                  {iconProps.strokeWidth || 0}px
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Box Shadow
                </label>
                <select
                  value={iconProps.boxShadow || ''}
                  onChange={(e) => handleChange('boxShadow', e.target.value)}
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
                  onChange={(e) => handleChange('iconShadow', e.target.value)}
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
                  onChange={(e) => handleChange('cursor', e.target.value)}
                  className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="default">Default</option>
                  <option value="auto">Auto</option>
                  <option value="pointer">Pointer</option>
                  <option value="help">Help</option>
                  <option value="not-allowed">Not Allowed</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-100 flex justify-end">
          <button
            onClick={copyToClipboard}
            className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Copy Code
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default IconCustomizeModal;
