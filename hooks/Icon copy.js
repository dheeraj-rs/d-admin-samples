import React, { useState, useEffect } from 'react';
import { iconData } from './iconData';

const IconService = {
  icons: iconData.icons || iconData,
  getIcons() {
    return this.icons;
  },
  getIcon(name) {
    return this.icons.find((icon) => {
      return icon.properties
        ? icon.properties.name === name
        : icon.name === name;
    });
  },
};

const getGradientDirection = (direction) => {
  const directions = {
    top: { x: '50%', y: '0%' },
    bottom: { x: '50%', y: '100%' },
    left: { x: '0%', y: '50%' },
    right: { x: '100%', y: '50%' },
    topLeft: { x: '0%', y: '0%' },
    topRight: { x: '100%', y: '0%' },
    bottomLeft: { x: '0%', y: '100%' },
    bottomRight: { x: '100%', y: '100%' },
  };
  return directions[direction] || { x: '0%', y: '0%' };
};

const Icon = ({
  name,
  size = '1em',
  color = 'currentColor',
  gradientColors = null,
  hoverColor = null,
  hoverGradientColors = null,
  directionStart = 'topLeft',
  directionEnd = 'bottomRight',
  styles = {},
  opacity = 1,
  backgroundColor = 'transparent',
  hoverBackgroundColor = null,
  shape = 'circle',
  borderRadius = 0,
  padding = 0,
  outerPadding = 0,
  boxShadow = null,
  iconShadow = null,
  cursor = 'default',
  ...props
}) => {
  const [iconData, setIconData] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const icon = IconService.getIcon(name);
    setIconData(icon);
  }, [name]);

  const viewBox =
    iconData?.icon?.viewBox || iconData?.viewBox || '0 0 1024 1024';
  const paths = iconData?.icon?.paths || iconData?.paths || [];

  const activeGradientColors =
    isHovered && hoverGradientColors ? hoverGradientColors : gradientColors;
  const activeColor = isHovered && hoverColor ? hoverColor : color;
  const activeBackgroundColor =
    isHovered && hoverBackgroundColor ? hoverBackgroundColor : backgroundColor;

  const fillStyle = activeGradientColors ? 'url(#iconGradient)' : activeColor;

  const start = getGradientDirection(directionStart);
  const end = getGradientDirection(directionEnd);

  const [viewBoxWidth, viewBoxHeight] = viewBox.split(' ').slice(2).map(Number);
  const totalSize = parseFloat(size) + 2 * outerPadding;
  const innerSize = parseFloat(size) - 2 * padding;
  const scaleFactor = innerSize / viewBoxWidth;

  const shapeElement =
    shape === 'circle' ? (
      <circle
        cx={totalSize / 2}
        cy={totalSize / 2}
        r={parseFloat(size) / 2}
        fill={activeBackgroundColor}
      />
    ) : shape === 'square' ? (
      <rect
        x={outerPadding}
        y={outerPadding}
        width={parseFloat(size)}
        height={parseFloat(size)}
        fill={activeBackgroundColor}
        rx={borderRadius}
      />
    ) : null;

  const wrapperStyle = {
    display: 'inline-block',
    borderRadius: shape === 'circle' ? '50%' : `${borderRadius}px`,
    lineHeight: 0,
    cursor: cursor,
    position: 'relative',
  };

  const svgStyle = {
    ...styles,
    opacity,
    display: 'block',
    cursor: cursor,
    filter: iconShadow ? 'drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5))' : 'none',
  };

  const svgContent = (
    <svg
      width={totalSize}
      height={totalSize}
      viewBox={`0 0 ${totalSize} ${totalSize}`}
      xmlns="http://www.w3.org/2000/svg"
      style={svgStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <defs>
        {activeGradientColors && (
          <linearGradient
            id="iconGradient"
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={activeGradientColors[0]} />
            <stop offset="100%" stopColor={activeGradientColors[1]} />
          </linearGradient>
        )}
      </defs>
      {shapeElement}
      <g
        transform={`translate(${outerPadding + padding}, ${
          outerPadding + padding
        }) scale(${scaleFactor})`}
      >
        {paths.map((path, index) => (
          <path key={index} d={path} fill={fillStyle} />
        ))}
      </g>
    </svg>
  );

  return (
    <div style={wrapperStyle}>
      {boxShadow ? (
        <div
          style={{
            boxShadow: boxShadow,
            borderRadius: shape === 'circle' ? '50%' : `${borderRadius}px`,
          }}
        >
          {svgContent}
        </div>
      ) : (
        svgContent
      )}
    </div>
  );
};

export default Icon;
