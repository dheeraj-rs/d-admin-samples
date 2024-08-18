import React, { useMemo, useState, useCallback } from 'react';
import { iconData } from './iconData';

const IconService = {
  icons: iconData.icons || iconData,
  getIcon: (name) =>
    IconService.icons.find(
      (icon) => (icon.properties?.name || icon.name) === name
    ),
};

const DIRECTIONS = {
  top: { x: '50%', y: '0%' },
  bottom: { x: '50%', y: '100%' },
  left: { x: '0%', y: '50%' },
  right: { x: '100%', y: '50%' },
  topLeft: { x: '0%', y: '0%' },
  topRight: { x: '100%', y: '0%' },
  bottomLeft: { x: '0%', y: '100%' },
  bottomRight: { x: '100%', y: '100%' },
};

const parseSize = (value, defaultValue = '1em') =>
  typeof value === 'number'
    ? `${value}px`
    : typeof value === 'string'
    ? isNaN(parseFloat(value))
      ? value
      : `${parseFloat(value)}px`
    : defaultValue;

const parseColor = (color, defaultColor = 'currentColor') =>
  color || defaultColor;

const parseGradientColors = (colors) =>
  Array.isArray(colors) && colors.length >= 2
    ? [parseColor(colors[0]), parseColor(colors[1])]
    : null;

const parseNumber = (value, defaultValue = 0) => {
  const num = parseFloat(value);
  return isNaN(num) ? defaultValue : num;
};

const Icon = React.memo(
  ({
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
    strokeWidth = 0, // New prop for stroke width
    ...props
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    const memoizedValues = useMemo(() => {
      const icon = IconService.getIcon(name?.trim());
      if (!icon) {
        console.error(`Icon "${name}" not found`);
        return null;
      }

      const parsedSize = parseSize(size);
      const parsedColor = parseColor(color);
      const parsedHoverColor = parseColor(hoverColor);
      const parsedBackgroundColor = parseColor(backgroundColor);
      const parsedHoverBackgroundColor = parseColor(hoverBackgroundColor);
      const parsedGradientColors = parseGradientColors(gradientColors);
      const parsedHoverGradientColors =
        parseGradientColors(hoverGradientColors);
      const parsedOpacity = parseNumber(opacity, 1);
      const parsedBorderRadius = parseNumber(borderRadius);
      const parsedPadding = parseNumber(padding);
      const parsedOuterPadding = parseNumber(outerPadding);
      const parsedStrokeWidth = parseNumber(strokeWidth, 0); // Parse stroke width
      const start = DIRECTIONS[directionStart] || DIRECTIONS.topLeft;
      const end = DIRECTIONS[directionEnd] || DIRECTIONS.bottomRight;
      const viewBox = icon.icon?.viewBox || icon.viewBox || '0 0 1024 1024';
      const paths = icon.icon?.paths || icon.paths || [];

      const [viewBoxWidth, viewBoxHeight] = viewBox
        .split(' ')
        .slice(2)
        .map(Number);
      const totalSize = parseFloat(parsedSize) + 2 * parsedOuterPadding;
      const innerSize = parseFloat(parsedSize) - 2 * parsedPadding;
      const scaleFactor = innerSize / viewBoxWidth;

      return {
        icon,
        parsedSize,
        parsedColor,
        parsedHoverColor,
        parsedBackgroundColor,
        parsedHoverBackgroundColor,
        parsedGradientColors,
        parsedHoverGradientColors,
        parsedOpacity,
        parsedBorderRadius,
        parsedPadding,
        parsedOuterPadding,
        parsedStrokeWidth,
        start,
        end,
        viewBox,
        paths,
        viewBoxWidth,
        viewBoxHeight,
        totalSize,
        innerSize,
        scaleFactor,
      };
    }, [
      name,
      size,
      color,
      hoverColor,
      backgroundColor,
      hoverBackgroundColor,
      gradientColors,
      hoverGradientColors,
      opacity,
      borderRadius,
      padding,
      outerPadding,
      strokeWidth,
      directionStart,
      directionEnd,
    ]);

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    if (!memoizedValues) return null;

    const {
      parsedSize,
      parsedColor,
      parsedHoverColor,
      parsedBackgroundColor,
      parsedHoverBackgroundColor,
      parsedGradientColors,
      parsedHoverGradientColors,
      parsedOpacity,
      parsedBorderRadius,
      parsedPadding,
      parsedOuterPadding,
      parsedStrokeWidth,
      start,
      end,
      viewBox,
      paths,
      viewBoxWidth,
      viewBoxHeight,
      totalSize,
      scaleFactor,
    } = memoizedValues;

    const activeColor =
      isHovered && hoverColor ? parsedHoverColor : parsedColor;
    const activeGradientColors =
      isHovered && hoverGradientColors
        ? parsedHoverGradientColors
        : parsedGradientColors;
    const activeBackgroundColor =
      isHovered && hoverBackgroundColor
        ? parsedHoverBackgroundColor
        : parsedBackgroundColor;

    const shapeElement =
      shape === 'circle' ? (
        <circle
          cx={totalSize / 2}
          cy={totalSize / 2}
          r={parseFloat(parsedSize) / 2}
          fill={activeBackgroundColor}
        />
      ) : shape === 'square' ? (
        <rect
          x={parsedOuterPadding}
          y={parsedOuterPadding}
          width={parseFloat(parsedSize)}
          height={parseFloat(parsedSize)}
          fill={activeBackgroundColor}
          rx={parsedBorderRadius}
        />
      ) : null;

    const wrapperStyle = {
      display: 'inline-block',
      borderRadius: shape === 'circle' ? '50%' : `${parsedBorderRadius}px`,
      lineHeight: 0,
      cursor,
      position: 'relative',
    };

    const svgStyle = {
      ...styles,
      opacity: parsedOpacity,
      display: 'block',
      cursor,
      filter: iconShadow ? `drop-shadow(${iconShadow})` : 'none',
    };

    const svgContent = (
      <svg
        width={totalSize}
        height={totalSize}
        viewBox={`0 0 ${totalSize} ${totalSize}`}
        xmlns="http://www.w3.org/2000/svg"
        style={svgStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <defs>
          {activeGradientColors && (
            <linearGradient
              id={`iconGradient-${name}`}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
            >
              <stop offset="0%" stopColor={activeGradientColors[0]} />
              <stop offset="100%" stopColor={activeGradientColors[1]} />
            </linearGradient>
          )}
        </defs>
        {shapeElement}
        <g
          transform={`translate(${parsedOuterPadding + parsedPadding}, ${
            parsedOuterPadding + parsedPadding
          }) scale(${scaleFactor})`}
        >
          {activeGradientColors ? (
            <>
              <mask id={`iconMask-${name}`}>
                {paths.map((path, index) => (
                  <path key={index} d={path} fill="white" />
                ))}
              </mask>
              <rect
                x="0"
                y="0"
                width={viewBoxWidth}
                height={viewBoxHeight}
                fill={`url(#iconGradient-${name})`}
                mask={`url(#iconMask-${name})`}
                strokeWidth={parsedStrokeWidth}
                stroke={activeColor}
              />
            </>
          ) : (
            paths.map((path, index) => (
              <path
                key={index}
                d={path}
                fill={activeColor}
                strokeWidth={parsedStrokeWidth}
                stroke={activeColor}
              />
            ))
          )}
        </g>
      </svg>
    );

    return (
      <div style={wrapperStyle}>
        {boxShadow ? (
          <div
            style={{
              boxShadow,
              borderRadius:
                shape === 'circle' ? '50%' : `${parsedBorderRadius}px`,
            }}
          >
            {svgContent}
          </div>
        ) : (
          svgContent
        )}
      </div>
    );
  }
);

Icon.displayName = 'Icon';

export default Icon;
