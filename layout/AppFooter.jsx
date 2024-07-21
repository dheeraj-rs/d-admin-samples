import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';
import Image from 'next/image';

const AppFooter = () => {
  const { layoutConfig } = useContext(LayoutContext);

  return (
    <div className="layout-footer">
      <Image
        src={`/layout/images/logo-${
          layoutConfig.colorScheme === 'light' ? 'dark' : 'white'
        }.svg`}
        alt="Logo"
        height={20}
        className="mr-2"
        width={20}
      />
      by
      <span className="font-medium ml-2">Dheeraj</span>
    </div>
  );
};

export default AppFooter;
