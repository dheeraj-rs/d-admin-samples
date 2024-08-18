import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';

const AppMenu = () => {
  const model = [
    {
      label: 'Home',
      items: [{ label: 'Dashboard', icon: ' home', to: '/' }],
    },
    {
      label: 'UI Components',
      items: [
        {
          label: 'Form Layout',
          icon: ' id-card',
          to: '/uikit/formlayout',
        },
        {
          label: 'Input',
          icon: ' check-square',
          to: '/uikit/input',
        },
        {
          label: 'Float Label',
          icon: ' bookmark',
          to: '/uikit/floatlabel',
        },
        {
          label: 'Invalid State',
          icon: ' exclamation-circle',
          to: '/uikit/invalidstate',
        },
        {
          label: 'Button',
          icon: ' mobile',
          to: '/uikit/button',
          class: 'rotated-icon',
        },
        { label: 'Table', icon: ' table', to: '/uikit/table' },
        { label: 'List', icon: ' list', to: '/uikit/list' },
        { label: 'Tree', icon: ' share-alt', to: '/uikit/tree' },
        { label: 'Panel', icon: ' tablet', to: '/uikit/panel' },
        { label: 'Overlay', icon: ' clone', to: '/uikit/overlay' },
        { label: 'Media', icon: ' image', to: '/uikit/media' },
        {
          label: 'Menu',
          icon: ' bars',
          to: '/uikit/menu',
          preventExact: true,
        },
        { label: 'Message', icon: ' comment', to: '/uikit/message' },
        { label: 'File', icon: ' file', to: '/uikit/file' },
        { label: 'Chart', icon: ' chart-bar', to: '/uikit/charts' },
        { label: 'Misc', icon: ' circle', to: '/uikit/misc' },
      ],
    },
    {
      label: 'Prime Blocks',
      items: [
        {
          label: 'Free Blocks',
          icon: ' eye',
          to: '/blocks',
          badge: 'NEW',
        },
        {
          label: 'All Blocks',
          icon: ' globe',
          url: 'https://github.com/dheeraj-rs',
          target: '_blank',
        },
      ],
    },
    {
      label: 'Utilities',
      items: [
        {
          label: 'Icons',
          icon: ' prime',
          to: '/utilities/icons',
        },
        {
          label: 'PrimeFlex',
          icon: ' desktop',
          url: 'https://github.com/dheeraj-rs',
          target: '_blank',
        },
      ],
    },
    {
      label: 'Pages',
      icon: ' briefcase',
      to: '/pages',
      items: [
        {
          label: 'Landing',
          icon: ' globe',
          to: '/landing',
        },
        {
          label: 'Auth',
          icon: ' user',
          items: [
            {
              label: 'Login',
              icon: ' sign-in',
              to: '/auth/login',
            },
            {
              label: 'Error',
              icon: ' times-circle',
              to: '/auth/error',
            },
            {
              label: 'Access Denied',
              icon: ' lock',
              to: '/auth/access',
            },
          ],
        },
        {
          label: 'Crud',
          icon: ' pencil',
          to: '/pages/crud',
        },
        {
          label: 'Timeline',
          icon: ' calendar',
          to: '/pages/timeline',
        },
        {
          label: 'Not Found',
          icon: ' exclamation-circle',
          to: '/pages/notfound',
        },
        {
          label: 'Empty',
          icon: ' circle-off',
          to: '/pages/empty',
        },
      ],
    },
    {
      label: 'Hierarchy',
      items: [
        {
          label: 'Submenu 1',
          icon: ' bookmark',
          items: [
            {
              label: 'Submenu 1.1',
              icon: ' bookmark',
              items: [
                { label: 'Submenu 1.1.1', icon: ' bookmark' },
                { label: 'Submenu 1.1.2', icon: ' bookmark' },
                { label: 'Submenu 1.1.3', icon: ' bookmark' },
              ],
            },
            {
              label: 'Submenu 1.2',
              icon: ' bookmark',
              items: [{ label: 'Submenu 1.2.1', icon: ' bookmark' }],
            },
          ],
        },
        {
          label: 'Submenu 2',
          icon: ' bookmark',
          items: [
            {
              label: 'Submenu 2.1',
              icon: ' bookmark',
              items: [
                { label: 'Submenu 2.1.1', icon: ' bookmark' },
                { label: 'Submenu 2.1.2', icon: ' bookmark' },
              ],
            },
            {
              label: 'Submenu 2.2',
              icon: ' bookmark',
              items: [{ label: 'Submenu 2.2.1', icon: ' bookmark' }],
            },
          ],
        },
      ],
    },
    {
      label: 'Get Started',
      items: [
        {
          label: 'Documentation',
          icon: ' question',
          to: '/documentation',
        },
        {
          label: 'Figma',
          url: 'https://github.com/dheeraj-rs',
          icon: ' pencil',
          target: '_blank',
        },
        {
          label: 'View Source',
          icon: ' search',
          url: 'https://github.com/dheeraj-rs',
          target: '_blank',
        },
      ],
    },
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item?.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className="menu-separator"></li>
          );
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
