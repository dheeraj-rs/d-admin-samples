import React, { useState, useEffect, useRef } from 'react';
const IconService = {
  icons: [],
  async getIcons() {
    if (this.icons.length === 0) {
      try {
        const res = await fetch('/demo/data/icons.json', {
          headers: { 'Cache-Control': 'no-cache' },
        });
        const data = await res.json();
        this.icons = data.icons;
      } catch (error) {
        console.error('Failed to fetch icons:', error);
        this.icons = [];
      }
    }
    return this.icons;
  },
  getIcon(name) {
    return this.icons.find((icon) => icon.properties.name === name);
  },
};
const Icon = ({ name, color = 'currentColor', size = '1em', ...props }) => {
  const [iconData, setIconData] = useState(null);
  const svgRef = useRef(null);
  useEffect(() => {
    IconService.getIcons().then(() => {
      const icon = IconService.getIcon(name);
      setIconData(icon);
    });
  }, [name]);
  useEffect(() => {
    if (svgRef.current && iconData) {
      const svg = svgRef.current;
      svg.querySelectorAll('*').forEach((el) => {
        ['fill', 'stroke'].forEach((attr) => {
          if (el.getAttribute(attr) && el.getAttribute(attr) !== 'none') {
            el.setAttribute(attr, color);
          }
        });
      });
    }
  }, [color, iconData]);
  if (!iconData) {
    return null;
  }
  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox={iconData.icon.viewBox || '0 0 1024 1024'}
      dangerouslySetInnerHTML={{ __html: iconData.icon.paths.join('') }}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    />
  );
};
export default Icon;
