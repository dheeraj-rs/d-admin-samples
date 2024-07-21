/* eslint-disable @next/next/no-sync-scripts */
import React from 'react';

const Documentation = () => {
  return (
    <>
      <div className="grid">
        <div className="col-12">
          <div className="card docs">
            <h4>Current Version</h4>
            <p>Next v14 Javascript</p>

            <h5>Getting Started</h5>
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
