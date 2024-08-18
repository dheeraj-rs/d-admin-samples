'use client';
import GradienticonsWebsite from '@/hooks/GradienticonsWebsite';
import Icon from '@/hooks/Icon';
/* eslint-disable @next/next/no-sync-scripts */
// import { Icon } from '@dheerajrs/d-icon';

import React from 'react';

const Documentation = () => {
  return (
    <>
      <div className="grid">
        <div className="col-12">
          <div className="card docs">
            <GradienticonsWebsite />
            <h4>Current Version</h4>
            <Icon
              name="home"
              size={100}
              // opacity="0.6"
              // color="blue"
              // padding="20"
              // backgroundColor="red"
              // directionStart="bottom"
              // hoverColor={'red'}
              // directionEnd="top"
              // hoverGradientColors={['red', 'blue']}
              gradientColors={['#647758', '#0875']}
            />

            <Icon
              name="eraser"
              size={40}
              padding={8}
              color="#4A90E2"
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
            />
            {/* <Icon name="home" size="20" color="blue" /> */}
            <p>Next v14 Javascript</p>
            <h5 style={{ cursor: 'pointer' }}>Getting Started</h5>
            <p>
              This is an Ui Component application template for React based on
              the popular{' '}
              <a
                href="https://nextjs.org/"
                className="font-medium hover:underline text-primary"
              >
                Next.js
              </a>{' '}
              framework with new{' '}
              <a
                href="https://nextjs.org/docs/app"
                className="font-medium hover:underline text-primary"
              >
                App Router
              </a>
              . To get started, clone the{' '}
              <a
                href="https://github.com/dheeraj-rs"
                className="font-medium hover:underline text-primary"
              >
                repository
              </a>{' '}
              from GitHub and install the dependencies with npm or yarn.
            </p>
            <pre className="app-code">
              <code>{`"npm install" or "yarn"`}</code>
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default Documentation;
