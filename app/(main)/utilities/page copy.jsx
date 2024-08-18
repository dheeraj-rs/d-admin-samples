'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IconService } from '../../../../demo/service/IconService';
import Icon from './Icon';

const IconsDemo = () => {
  const [icons, setIcons] = useState([]);
  const [filteredIcons, setFilteredIcons] = useState([]);

  useEffect(() => {
    IconService.getIcons().then((data) => {
      data.sort((icon1, icon2) => {
        if (icon1.properties.name < icon2.properties.name) return -1;
        else if (icon1.properties.name < icon2.properties.name) return 1;
        else return 0;
      });

      setIcons(data);
      setFilteredIcons(data);
    });
  }, []);

  const onFilter = (event) => {
    if (!event.currentTarget.value) {
      setFilteredIcons(icons);
    } else {
      setFilteredIcons(
        icons.filter((it) => {
          return (
            it.icon &&
            it.icon.tags &&
            it.icon.tags[0].includes(event.currentTarget.value)
          );
        })
      );
    }
  };

  return (
    <div className="card">
      <h2>Icons</h2>
      <p>
        my components internally use{' '}
        <Link
          href="https://github.com/MyIcons/MyIcons"
          className="font-medium hover:underline text-primary"
          target={'_blank'}
        >
          MyIcons
        </Link>{' '}
        library, the official icons suite from{' '}
        <Link
          href="https://www.MyIcons.com"
          className="font-medium hover:underline text-primary"
          target={'_blank'}
        >
          PrimeTek
        </Link>
        .
      </p>
      <h4>Download</h4>
      <p>
        MyIcons is available at npm, run the following command to download it to
        your project.
      </p>
      <pre className="app-code">
        <code>{`npm install myicons --save`}</code>
      </pre>
      <h4>Getting Started</h4>
      <p>
        MyIcons use the <strong>pi pi-&#123;icon&#125;</strong> syntax such as{' '}
        <strong>pi pi-check</strong>. A standalone icon can be displayed using
        an element like <i>i</i> or <i>span</i>
      </p>
      <pre className="app-code">
        <code>
          {`<i className="pi pi-check" style={{ marginRight: '.5rem' }}></i>
<i className="pi pi-times"></i>`}
        </code>
      </pre>
      <h4>Size</h4>
      <p>Size of the icons can easily be changed using font-size property.</p>
      <pre className="app-code">
        <code>
          {`
<i className="pi pi-check"></i>
`}
        </code>
      </pre>
      <i className="pi pi-check"></i>
      <pre className="app-code">
        <code>
          {`
<i className="pi pi-check" style={{ fontSize: '2rem' }}></i>
`}
        </code>
      </pre>
      <i className="pi pi-check" style={{ fontSize: '2rem' }}></i>
      <h4>Spinning Animation</h4>
      <p>Special pi-spin class applies continuous rotation to an icon.</p>
      <pre className="app-code">
        <code>{`<i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>`}</code>
      </pre>
      <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
      <h4>List of Icons</h4>
      <p>
        Here is the current list of PrimeIcons, more icons are added
        periodically. You may also{' '}
        <Link
          href="https://github.com/primefaces/primeicons/issues"
          className="font-medium hover:underline text-primary"
          target={'_blank'}
        >
          request new icons
        </Link>{' '}
        at the issue tracker.
      </p>
      <div
        className="icon-container"
        style={{ display: 'inline-block', textAlign: 'center', margin: '10px' }}
      >
        {' '}
        <img src="/public/cog.svg" alt="Icon" width="24" height="24" />
      </div>

      <div>
        <input
          type="text"
          className="w-full p-3 mt-3 mb-5"
          onInput={onFilter}
          placeholder="Search an icon"
        />
      </div>
      <div
        className="grid icons-list text-center"
        style={{ display: 'flex', flexWrap: 'wrap' }}
      >
        {filteredIcons.map((iconObj, index) => (
          <div key={index} className="icon-item" style={{ margin: '10px' }}>
            <Icon pathData={iconObj.icon.paths} fill="#2a1818" size="2rem" />
            <h3>{iconObj.properties.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconsDemo;
