'use client';
import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { MenuContext } from './context/menucontext';
import { CSSTransition } from 'react-transition-group';
import Icon from '@/hooks/Icon';

const AppMenuitem = (props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { activeMenu, setActiveMenu } = useContext(MenuContext);

  const item = props.item;
  const key = props.parentKey
    ? props.parentKey + '-' + props.index
    : String(props.index);

  const active = activeMenu === key || activeMenu.startsWith(key + '-');
  const isActiveRoute = item.to && pathname === item.to;

  const onRouteChange = (url) => {
    if (item.to && item.to === url) {
      setActiveMenu(key);
    }
  };

  useEffect(() => {
    onRouteChange(pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  const itemClick = (event) => {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (item.command) {
      item.command({ originalEvent: event, item });
    }

    if (item.items) setActiveMenu(active ? props.parentKey : key);
    else setActiveMenu(key);
  };

  const subMenu = item.items && item.visible !== false && (
    <CSSTransition
      timeout={{ enter: 1000, exit: 450 }}
      classNames="layout-submenu"
      in={props.root ? true : active}
      key={item.label}
    >
      <ul>
        {item.items.map((child, i) => {
          return (
            <AppMenuitem
              item={child}
              index={i}
              className={child.badgeClass}
              parentKey={key}
              key={child.label}
            />
          );
        })}
      </ul>
    </CSSTransition>
  );

  return (
    <li
      className={`${props.root ? 'layout-root-menuitem' : ''} ${
        active ? 'active-menuitem' : ''
      }`}
    >
      {props.root && item.visible !== false && (
        <div className="layout-menuitem-root-text">{item.label}</div>
      )}

      {(!item.to || item.items) && item.visible !== false ? (
        <a
          href={item.url}
          onClick={itemClick}
          className={`${item.class} p-ripple`}
          target={item.target}
          tabIndex={0}
        >
          <Icon name={item.icon} size="15" style={{ marginRight: '8px' }} />
          <span className="layout-menuitem-text">{item.label}</span>
          {item.items && <Icon name="angle-down" size="15" />}
        </a>
      ) : null}

      {item.to && !item.items && item.visible !== false ? (
        <Link
          href={item.to}
          replace={item.replaceUrl}
          target={item.target}
          onClick={itemClick}
          className={`${item.class} p-ripple ${
            isActiveRoute ? 'active-route' : ''
          }`}
          tabIndex={0}
        >
          <Icon name={item.icon} size="15" style={{ marginRight: '8px' }} />
          <span className="layout-menuitem-text">{item.label}</span>
          {item.items && <Icon name="angle-down" size="15" />}
        </Link>
      ) : null}

      {subMenu}
    </li>
  );
};

export default AppMenuitem;
