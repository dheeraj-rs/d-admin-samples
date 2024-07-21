'use client';

import React, { useContext, useEffect, useRef, useCallback } from 'react';
import { LayoutContext } from './context/layoutcontext';
import { usePathname, useSearchParams } from 'next/navigation';
import AppFooter from './AppFooter';
import AppSidebar from './AppSidebar';
import AppTopbar from './AppTopbar';
import { useEventListener } from '@/hooks/useEventListener';

const Layout = ({ children }) => {
  const { layoutConfig, layoutState, setLayoutState } =
    useContext(LayoutContext);
  const topbarRef = useRef(null);
  const sidebarRef = useRef(null);

  const hideMenu = useCallback(() => {
    setLayoutState((prevLayoutState) => ({
      ...prevLayoutState,
      overlayMenuActive: false,
      staticMenuMobileActive: false,
      menuHoverActive: false,
    }));
    unblockBodyScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setLayoutState]);

  const hideProfileMenu = useCallback(() => {
    setLayoutState((prevLayoutState) => ({
      ...prevLayoutState,
      profileSidebarVisible: false,
    }));
  }, [setLayoutState]);

  const blockBodyScroll = useCallback(() => {
    document.body.classList.add('blocked-scroll');
  }, []);

  const unblockBodyScroll = useCallback(() => {
    document.body.classList.remove('blocked-scroll');
  }, []);

  const handleOutsideClick = useCallback(
    (event) => {
      const targetNode = event.target;
      const isOutsideClicked = !(
        sidebarRef.current?.contains(targetNode) ||
        topbarRef.current?.menubutton?.contains(targetNode) ||
        topbarRef.current?.topbarmenu?.contains(targetNode) ||
        topbarRef.current?.topbarmenubutton?.contains(targetNode)
      );

      if (isOutsideClicked) {
        hideMenu();
      }
    },
    [hideMenu]
  );

  const handleProfileOutsideClick = useCallback(
    (event) => {
      const isOutsideClicked = !(
        topbarRef.current?.topbarmenu?.contains(event.target) ||
        topbarRef.current?.topbarmenubutton?.contains(event.target)
      );

      if (isOutsideClicked) {
        hideProfileMenu();
      }
    },
    [hideProfileMenu]
  );

  useEventListener('click', handleOutsideClick);
  useEventListener('click', handleProfileOutsideClick);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    hideMenu();
    hideProfileMenu();
  }, [pathname, searchParams, hideMenu, hideProfileMenu]);

  useEffect(() => {
    if (layoutState.overlayMenuActive || layoutState.staticMenuMobileActive) {
      blockBodyScroll();
    }
  }, [
    layoutState.overlayMenuActive,
    layoutState.staticMenuMobileActive,
    blockBodyScroll,
  ]);

  useEffect(() => {
    if (layoutState.profileSidebarVisible) {
      blockBodyScroll();
    }
  }, [layoutState.profileSidebarVisible, blockBodyScroll]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', layoutConfig.theme);
    document.documentElement.setAttribute(
      'data-color-scheme',
      layoutConfig.colorScheme
    );
  }, [layoutConfig.theme, layoutConfig.colorScheme]);

  const containerClass = `
    layout-wrapper 
    ${layoutConfig.menuMode === 'overlay' ? 'layout-overlay' : ''}
    ${layoutConfig.menuMode === 'static' ? 'layout-static' : ''}
    ${
      layoutState.staticMenuDesktopInactive &&
      layoutConfig.menuMode === 'static'
        ? 'layout-static-inactive'
        : ''
    }
    ${layoutState.overlayMenuActive ? 'layout-overlay-active' : ''}
    ${layoutState.staticMenuMobileActive ? 'layout-mobile-active' : ''}
    ${layoutConfig.inputStyle === 'filled' ? 'p-input-filled' : ''}
    ${!layoutConfig.ripple ? 'p-ripple-disabled' : ''}
  `;

  return (
    <div className={containerClass}>
      <AppTopbar ref={topbarRef} />
      <div ref={sidebarRef} className="layout-sidebar">
        <AppSidebar />
      </div>
      <div className="layout-main-container">
        <div className="layout-main">{children}</div>
        <AppFooter />
      </div>
      <div className="layout-mask"></div>
    </div>
  );
};

export default React.memo(Layout);
