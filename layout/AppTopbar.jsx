import Link from 'next/link';
import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from 'react';
import { LayoutContext } from './context/layoutcontext';
import Image from 'next/image';
import AppConfig from './AppConfig';
import Icon from '@/hooks/Icon';

const AppTopbar = forwardRef((props, ref) => {
  const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } =
    useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }));

  return (
    <div ref={ref} className="layout-topbar">
      <Link href="/" className="layout-topbar-logo">
        <Image
          src={`/layout/logo-${
            layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'
          }.svg`}
          width={47.22}
          height={35}
          alt="logo"
        />

        <span>DHEERAJ</span>
      </Link>

      <button
        ref={menubuttonRef}
        type="button"
        className="p-link layout-menu-button layout-topbar-button"
        onClick={onMenuToggle}
      >
        <Icon name="bars" size="25px" />
      </button>

      <button
        ref={topbarmenubuttonRef}
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={showProfileSidebar}
      >
        <Icon name="calendar-v" size="25px" />
      </button>

      <div
        ref={topbarmenuRef}
        className={`layout-topbar-menu ${
          layoutState.profileSidebarVisible
            ? 'layout-topbar-menu-mobile-active'
            : ''
        }`}
      >
        <AppConfig />
        <button type="button" className="p-link layout-topbar-button">
          <Icon name="calendar" size="25px" />
          <span>Calendar</span>
        </button>
        <button type="button" className="p-link layout-topbar-button">
          <Icon name="user" size="25px" />
          <span>Profile</span>
        </button>
        <Link href="/documentation">
          <button type="button" className="p-link layout-topbar-button">
            <Icon name="cog" size="25px" />
            <span>Settings</span>
          </button>
        </Link>
      </div>
    </div>
  );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
