/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useContext, useEffect, useState } from 'react';
import { LayoutContext } from './context/layoutcontext';
import Image from 'next/image';

const AppConfig = (props) => {
  const { layoutConfig, setLayoutConfig, layoutState, setLayoutState } =
    useContext(LayoutContext);
  const [scales] = useState([12, 13, 14, 15, 16]);

  const onConfigButtonClick = () => {
    setLayoutState((prevState) => ({
      ...prevState,
      configSidebarVisible: true,
    }));
  };

  const onConfigSidebarHide = () => {
    setLayoutState((prevState) => ({
      ...prevState,
      configSidebarVisible: false,
    }));
  };

  const changeInputStyle = (e) => {
    setLayoutConfig((prevState) => ({
      ...prevState,
      inputStyle: e.target.value,
    }));
  };

  const changeRipple = (e) => {
    setLayoutConfig((prevState) => ({
      ...prevState,
      ripple: e.target.checked,
    }));
  };

  const changeMenuMode = (e) => {
    setLayoutConfig((prevState) => ({
      ...prevState,
      menuMode: e.target.value,
    }));
  };

  const changeTheme = (theme, colorScheme) => {
    setLayoutConfig((prevState) => ({
      ...prevState,
      theme,
      colorScheme,
    }));
    document.documentElement.setAttribute('data-theme', theme);
  };

  const decrementScale = () => {
    setLayoutConfig((prevState) => ({
      ...prevState,
      scale: prevState.scale - 1,
    }));
  };

  const incrementScale = () => {
    setLayoutConfig((prevState) => ({
      ...prevState,
      scale: prevState.scale + 1,
    }));
  };

  const applyScale = () => {
    document.documentElement.style.fontSize = layoutConfig.scale + 'px';
  };

  useEffect(() => {
    applyScale();
  }, [layoutConfig.scale]);

  return (
    <>
      <button
        className="p-2 text-gray-600 hover:text-gray-900 fixed top-4 right-4 z-50"
        type="button"
        onClick={onConfigButtonClick}
      >
        <i className="pi pi-qrcode"></i>
        iii
      </button>

      {layoutState.configSidebarVisible && (
        <div
          className={`absolute right-0 top-0 h-[50vh]  w-80 transition-transform transform ${
            layoutState.configSidebarVisible
              ? 'translate-x-0'
              : 'translate-x-full'
          } shadow-lg p-5 p-editor-container overflow-y-auto`}
          style={{
            zIndex: 999,
            padding: '30px',
            borderRadius: '10px',
            color: 'black',
            position: 'absolute',
            top: '80px',
            right: '0px',
            overflow: 'scroll',
            height: '80vh',
            backgroundColor: '#ffffff3f',
          }}
        >
          <button
            className="mb-4 p-2 bg-gray-200 hover:bg-gray-300 rounded"
            onClick={onConfigSidebarHide}
          >
            Close
          </button>
          {!props.simple && (
            <>
              <h5 className="text-lg font-semibold mb-4">Scale</h5>
              <div className="flex items-center mb-4">
                <button
                  type="button"
                  onClick={decrementScale}
                  className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded mr-2"
                  disabled={layoutConfig.scale === scales[0]}
                >
                  -
                </button>
                <div className="flex gap-2 items-center">
                  {scales.map((item) => (
                    <i
                      key={item}
                      className={`pi pi-circle-fill ${
                        item === layoutConfig.scale
                          ? 'text-blue-500'
                          : 'text-gray-300'
                      }`}
                    ></i>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={incrementScale}
                  className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded ml-2"
                  disabled={layoutConfig.scale === scales[scales.length - 1]}
                >
                  +
                </button>
              </div>

              <h5 className="text-lg font-semibold mb-4">Menu Type</h5>
              <div className="flex mb-4">
                <div className="flex-1">
                  <input
                    type="radio"
                    name="menuMode"
                    value="static"
                    checked={layoutConfig.menuMode === 'static'}
                    onChange={changeMenuMode}
                    id="mode1"
                    className="mr-2"
                  />
                  <label htmlFor="mode1">Static</label>
                </div>
                <div className="flex-1">
                  <input
                    type="radio"
                    name="menuMode"
                    value="overlay"
                    checked={layoutConfig.menuMode === 'overlay'}
                    onChange={changeMenuMode}
                    id="mode2"
                    className="mr-2"
                  />
                  <label htmlFor="mode2">Overlay</label>
                </div>
              </div>

              <h5 className="text-lg font-semibold mb-4">Input Style</h5>
              <div className="flex mb-4">
                <div className="flex-1">
                  <input
                    type="radio"
                    name="inputStyle"
                    value="outlined"
                    checked={layoutConfig.inputStyle === 'outlined'}
                    onChange={changeInputStyle}
                    id="outlined_input"
                    className="mr-2"
                  />
                  <label htmlFor="outlined_input">Outlined</label>
                </div>
                <div className="flex-1">
                  <input
                    type="radio"
                    name="inputStyle"
                    value="filled"
                    checked={layoutConfig.inputStyle === 'filled'}
                    onChange={changeInputStyle}
                    id="filled_input"
                    className="mr-2"
                  />
                  <label htmlFor="filled_input">Filled</label>
                </div>
              </div>

              <h5 className="text-lg font-semibold mb-4">Ripple Effect</h5>
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={layoutConfig.ripple}
                  onChange={changeRipple}
                  className="mr-2"
                />
                Enable Ripple
              </label>
            </>
          )}

          <h5 className="text-lg font-semibold mb-4">Theme</h5>
          <div className="grid grid-cols-4 gap-4">
            {[
              'lara-light-indigo',
              'lara-light-blue',
              'lara-light-purple',
              'lara-light-teal',
              'lara-dark-indigo',
              'lara-dark-blue',
              'lara-dark-purple',
              'lara-dark-teal',
              'soho-light',
              'soho-dark',
              'viva-light',
              'viva-dark',
              'mira',
              'nano',
            ].map((theme) => (
              <button
                key={theme}
                className="w-10 h-10 p-0 border border-gray-200 rounded"
                onClick={() =>
                  changeTheme(theme, theme.includes('dark') ? 'dark' : 'light')
                }
              >
                <Image
                  src={`/layout/images/themes/${theme}.png`}
                  className="rounded"
                  alt={theme}
                  width={40}
                  height={40}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AppConfig;
