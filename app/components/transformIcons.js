import React from 'react';
import Icon from './Icon'; // Adjust the path to your Icon component

const transformIcons = (node, iconData) => {
  if (React.isValidElement(node)) {
    // Check if the node is an <i> element with a className containing "pi pi-"
    if (
      node.type === 'i' &&
      node.props.className &&
      node.props.className.includes('pi pi-')
    ) {
      const classNames = node.props.className.split(' ');
      const iconName = classNames
        .find((className) => className.startsWith('pi-'))
        ?.replace('pi-', '');

      if (iconName) {
        const matchingIcon = iconData.icons?.find(
          (icon) => icon.properties.name === iconName
        );

        if (matchingIcon) {
          return (
            <Icon
              pathData={matchingIcon.icon.paths}
              fill={node.props.style?.color || 'currentColor'}
              size={node.props.style?.fontSize || '24'}
            />
          );
        }
      }
    }

    // Recursively transform children
    return React.cloneElement(node, {
      ...node.props,
      children: React.Children.map(node.props.children, (child) =>
        transformIcons(child, iconData)
      ),
    });
  }

  return node;
};

export default transformIcons;
