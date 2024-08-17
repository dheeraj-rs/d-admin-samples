import React from 'react';
import { IconService } from '../../../../demo/service/IconService';

const Icon = ({ name, fill = 'currentColor', size = '1em', ...props }) => {
  const [iconData, setIconData] = React.useState(null);

  React.useEffect(() => {
    IconService.getIcons().then((icons) => {
      const icon = icons.find((i) => i.properties.name === name);
      setIconData(icon);
    });
  }, [name]);

  if (!iconData) {
    return null; // or a loading spinner
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {iconData.icon.paths.map((path, index) => (
        <path
          key={index}
          d={path}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
};

export default Icon;
